import { withWhopAppConfig } from "@whop/react/next.config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@madez/whop-shared"],
  serverExternalPackages: ["@whop/sdk", "jose"],
};

export default withWhopAppConfig(nextConfig);
