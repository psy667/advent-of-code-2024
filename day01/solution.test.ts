import { expect, test } from "bun:test";

import { solution1, solution2 } from "./solution.ts";

test("solution1", () => {
    expect(solution1(`3   4
4   3
2   5
1   3
3   9
3   3`)).toBe(11) 
});

test("solution2", () => {
    expect(solution2(`3   4
4   3
2   5
1   3
3   9
3   3`)
    ).toBe(31) 
});