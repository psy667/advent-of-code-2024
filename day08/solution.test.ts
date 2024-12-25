import { expect, test } from "bun:test";

import { getAntiNods, getCombinations, solution1, solution2 } from "./solution.ts";

const data = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`

test("getAntiNods", () => {
    expect(getAntiNods([3, 4], [5, 5])).toEqual([[1,3], [7, 6]])
    expect(getAntiNods([3, 4], [5, 3])).toEqual([[1,5], [7, 2]])
    expect(getAntiNods([1, 1], [1, 2])).toEqual([[1,0], [1, 3]])
})

test("getCombinations", () => {
    expect(getCombinations([1,2,3,4])).toEqual([[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]])
})

test("solution1", () => {
    expect(solution1(data)).toBe(14) 
});

test("solution2", () => {
    expect(solution2(data)).toBe(34)
});