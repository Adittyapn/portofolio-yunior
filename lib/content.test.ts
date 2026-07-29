import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { certifications, projects, skillCategories } from "./content.ts";

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

test("every project image exists in public", () => {
  for (const project of projects) {
    assert.ok(project.images.length > 0, `${project.slug} has no project images`);
    for (const image of project.images) {
      assert.ok(
        existsSync(new URL(`../public${image}`, import.meta.url)),
        `${project.slug} references missing image ${image}`
      );
    }
  }
});

test("every certification image exists in public", () => {
  for (const certification of certifications) {
    assert.ok(
      existsSync(new URL(`../public${certification.image}`, import.meta.url)),
      `${certification.name} references missing image ${certification.image}`
    );
  }
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
