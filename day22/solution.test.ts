import { expect, test } from "bun:test";

import { solution1, solution2 } from "./solution.ts";

const data = `1
2
3
2024`

test.skip("solution1", () => {
    expect(solution1(data)).toBe(37327623) 
});


test("solution2", () => {
    expect(solution2(data)).toBe()
});