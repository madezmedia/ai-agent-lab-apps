import assert from "node:assert/strict";
import { test } from "node:test";
import { exportJWK, generateKeyPair, SignJWT } from "jose";
import { verifyUserToken } from "./verify-user-token.ts";

async function signedToken(audience: string, issuer = "urn:whopcom:exp-proxy") {
  const { publicKey, privateKey } = await generateKeyPair("ES256");
  const jwk = await exportJWK(publicKey);
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "ES256" })
    .setIssuer(issuer)
    .setSubject("user_lab_member")
    .setAudience(audience)
    .setExpirationTime("2h")
    .sign(privateKey);
  return { token, publicKey: JSON.stringify(jwk) };
}

test("missing token returns null when dontThrow is set", async () => {
  const result = await verifyUserToken(new Headers(), {
    appId: "app_test",
    dontThrow: true,
  });
  assert.equal(result, null);
});

test("missing token throws by default", async () => {
  await assert.rejects(() => verifyUserToken(new Headers(), { appId: "app_test" }));
});

test("accepts a token minted for this app id", async () => {
  const { token, publicKey } = await signedToken("app_test");
  const result = await verifyUserToken(token, { appId: "app_test", publicKey });
  assert.deepEqual(result, { userId: "user_lab_member", appId: "app_test" });
});

test("reads the token from the Whop header", async () => {
  const { token, publicKey } = await signedToken("app_test");
  const headers = new Headers({ "x-whop-user-token": token });
  const result = await verifyUserToken(headers, { appId: "app_test", publicKey });
  assert.equal(result?.userId, "user_lab_member");
});

test("rejects a token for a different app", async () => {
  const { token, publicKey } = await signedToken("app_other");
  await assert.rejects(() => verifyUserToken(token, { appId: "app_test", publicKey }));
});

test("rejects a token with the wrong issuer", async () => {
  const { token, publicKey } = await signedToken("app_test", "https://example.invalid");
  await assert.rejects(() => verifyUserToken(token, { appId: "app_test", publicKey }));
});
