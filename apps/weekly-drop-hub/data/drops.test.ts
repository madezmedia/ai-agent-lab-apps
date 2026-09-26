import assert from "node:assert/strict";
import { test } from "node:test";
import { drops, filterDrops, groupDrops } from "./drops.ts";

test("seeded archive has both drop lanes", () => {
  assert.ok(drops.some((drop) => drop.type === "tuesday-live"));
  assert.ok(drops.some((drop) => drop.type === "friday-skill"));
});

test("friday filter keeps only skill drops", () => {
  const friday = filterDrops(drops, "friday-skill");
  assert.ok(friday.length > 0);
  assert.ok(friday.every((drop) => drop.type === "friday-skill"));
});

test("archive groups newest month first", () => {
  const groups = groupDrops(drops);
  assert.deepEqual(
    groups.map((group) => group.key),
    ["2026-09", "2026-08"],
  );
  assert.equal(groups[0]?.drops[0]?.id, "research-brief");
  assert.ok((groups[0]?.drops.length ?? 0) > (groups[1]?.drops.length ?? 0));
});
