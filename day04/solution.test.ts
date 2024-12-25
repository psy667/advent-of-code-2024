import { expect, test } from "bun:test";

import { solution1, solution2 } from "./solution.ts";

test("solution1", () => {
    expect(solution1(`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`)).toBe(18) 
});


test("solution2", () => {
    expect(solution2(`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`)).toBe(9) 
});