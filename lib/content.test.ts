import { test } from "node:test";
import assert from "node:assert/strict";
import { projects, skillCategories } from "./content.ts";

test("every project case study has non-empty case-study fields", () => {
  const fields = ["problem", "goal", "strategy", "execution", "results", "lessons"] as const;
  for (const project of projects) {
    for (const field of fields) {
      assert.ok(project[field].trim().length > 0, `${project.slug} is missing ${field}`);
    }
  }
});

test("project slugs are unique", () => {
  const slugs = projects.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length, "duplicate project slug found");
});

test("skill levels are within 0-100", () => {
  for (const category of skillCategories) {
    for (const skill of category.skills) {
      assert.ok(
        skill.level >= 0 && skill.level <= 100,
        `${category.name} - ${skill.name} level out of range`
      );
    }
  }
});
