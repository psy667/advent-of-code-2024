import { expect, test } from "bun:test";

import { solution1, solution2 } from "./solution.ts";

const data = `125 17`

test("solution1", () => {
    expect(solution1(data)).toBe(55312) 
});

test("solution2", () => {
    expect(solution2(data)).toBe(65601038650482)
});