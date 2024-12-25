import { expect, test } from "bun:test";

import { solution1, solution2 } from "./solution.ts";

const data = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`

test("solution1", () => {
    expect(solution1(data)).toBe(6) 
});


test("solution2", () => {
    expect(solution2(data)).toBe(16)
});