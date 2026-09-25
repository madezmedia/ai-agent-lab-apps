import {
  createRemoteJWKSet,
  importJWK,
  jwtVerify,
  type JWK,
  type JWTVerifyGetKey,
  type JWTVerifyOptions,
} from "jose";

const USER_TOKEN_HEADER = "x-whop-user-token";
const DEFAULT_JWKS_URL = "https://api.whop.com/.well-known/jwks.json";

const verifyOptions: JWTVerifyOptions = {
  issuer: "urn:whopcom:exp-proxy",
  algorithms: ["ES256"],
};

const jwksCache = new Map<string, JWTVerifyGetKey>();

function getRemoteJwks(url: string): JWTVerifyGetKey {
  const existing = jwksCache.get(url);
  if (existing) return existing;
  const created = createRemoteJWKSet(new URL(url), {
    cacheMaxAge: 12 * 60 * 60 * 1000,
    cooldownDuration: 30_000,
  });
  jwksCache.set(url, created);
  return created;
}

type HeaderSource = {
  get(name: string): string | null;
};

export type UserTokenPayload = {
  userId: string;
  appId: string;
};

export type VerifyUserTokenOptions = {
  /** Audience check. Pass NEXT_PUBLIC_WHOP_APP_ID. */
  appId?: string;
  /** JSON JWK string. When set, verification skips the remote JWKS fetch. */
  publicKey?: string;
  jwksUrl?: string;
  dontThrow?: boolean;
  headerName?: string;
};

function readToken(input: string | HeaderSource, headerName: string): string | null {
  if (typeof input === "string") return input.length > 0 ? input : null;
  if (typeof input?.get === "function") return input.get(headerName);
  return null;
}

/**
 * Verify the iframe user token Whop sends as `x-whop-user-token`.
 *
 * `@whop/sdk` 2.0 is the maintained API client and does not export this helper
 * (docs: https://docs.whop.com/developer/guides/authentication). This follows
 * the previous official whopsdk-typescript verifier: ES256, issuer
 * `urn:whopcom:exp-proxy`, JWKS `https://api.whop.com/.well-known/jwks.json`.
 */
export async function verifyUserToken(
  tokenOrHeaders: string | HeaderSource,
  options: VerifyUserTokenOptions = {},
): Promise<UserTokenPayload | null> {
  try {
    const tokenString = readToken(tokenOrHeaders, options.headerName ?? USER_TOKEN_HEADER);
    if (!tokenString) {
      throw new Error(
        "Whop user token not found. Open the app inside Whop, or run the dev proxy so x-whop-user-token is set.",
      );
    }

    const verified = options.publicKey
      ? await jwtVerify(
          tokenString,
          await importJWK(JSON.parse(options.publicKey) as JWK, "ES256"),
          verifyOptions,
        )
      : await jwtVerify(
          tokenString,
          getRemoteJwks(options.jwksUrl ?? DEFAULT_JWKS_URL),
          verifyOptions,
        );

    const { sub, aud } = verified.payload;
    if (!sub || !aud || Array.isArray(aud)) {
      throw new Error("Invalid user token provided to verifyUserToken");
    }
    if (options.appId && aud !== options.appId) {
      throw new Error("Invalid app id provided to verifyUserToken");
    }

    return { userId: sub, appId: aud };
  } catch (error) {
    if (options.dontThrow) return null;
    throw error;
  }
}
