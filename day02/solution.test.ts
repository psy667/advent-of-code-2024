import { expect, test } from "bun:test";

import { arrayVariations, solution1, solution2 } from "./solution.ts";

test("solution1", () => {
    expect(solution1(`
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`)).toBe(2) 
});

test("solution2", () => {
    expect(solution2(`
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`)).toBe(4) 
});

test("array variations", () => {
    expect(arrayVariations([1,2,3,4])).toEqual([
        [2,3,4],
        [1,3,4],
        [1,2,4],
        [1,2,3]
    ])
})