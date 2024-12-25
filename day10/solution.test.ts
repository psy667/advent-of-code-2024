import { expect, test } from "bun:test";

import { solution1, solution2 } from "./solution.ts";

const data = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`

test("solution1", () => {
    expect(solution1(data)).toBe(36) 
});


test("solution2", () => {
    expect(solution2(data)).toBe(81)
});