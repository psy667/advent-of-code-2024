import { expect, test } from "bun:test";

import { solution1, solution2 } from "./solution.ts";

const data = `2333133121414131402`

test("solution1", () => {
    expect(solution1(data)).toBe(1928) 
});


test("solution2", () => {
    expect(solution2(data)).toBe(2858)
});