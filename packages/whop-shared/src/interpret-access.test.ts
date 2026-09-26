import assert from "node:assert/strict";
import { test } from "node:test";
import { interpretAccess } from "./interpret-access.ts";

test("experience view allows customers and admins with access", () => {
  assert.equal(
    interpretAccess({ view: "experience", hasAccess: true, accessLevel: "customer" }),
    "ok",
  );
  assert.equal(
    interpretAccess({ view: "experience", hasAccess: true, accessLevel: "admin" }),
    "ok",
  );
});

test("experience view denies when checkAccess reports no access", () => {
  assert.equal(
    interpretAccess({ view: "experience", hasAccess: false, accessLevel: "no_access" }),
    "denied",
  );
});

test("dashboard view requires admin even if the API marks has_access", () => {
  assert.equal(
    interpretAccess({ view: "dashboard", hasAccess: true, accessLevel: "customer" }),
    "admin_required",
  );
  assert.equal(
    interpretAccess({ view: "dashboard", hasAccess: false, accessLevel: "no_access" }),
    "admin_required",
  );
  assert.equal(
    interpretAccess({ view: "dashboard", hasAccess: true, accessLevel: "admin" }),
    "ok",
  );
});
