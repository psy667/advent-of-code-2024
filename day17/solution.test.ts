import { expect, test } from "bun:test";

import { solution1, solution2 } from "./solution.ts";

const data = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`

test("solution1", () => {
    expect(solution1(data)).toBe('4,6,3,5,6,3,5,2,1,0') 
});
const data2 = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`

const data3 = `Register A: 0
Register B: 0
Register C: 0

Program: 2,4,1,1,7,5,4,7,1,4,0,3,5,5,3,0`

test("solution2", () => {
    expect(solution2(data2)).toBe(202367025818154)
});