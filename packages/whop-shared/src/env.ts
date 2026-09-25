/** Read a server env var at runtime. Dynamic access avoids Next inlining public vars at build. */
export function readServerEnv(name: string): string | undefined {
  const value = process.env[name];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed;
}
