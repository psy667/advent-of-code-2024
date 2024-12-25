import { expect, test } from "bun:test";

import { cut, solution1, solution2, solveEquation, solveEquation2 } from "./solution.ts";
console.log('\n'.repeat(20))

const data = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`

test("solve equation", () => {
    expect(solveEquation(292, [11, 6, 16, 20])).toBe(true)

    expect(solveEquation(3267, [81, 40, 27])).toBe(true)

    expect(solveEquation(7290, [6, 8, 6, 15])).toBe(false)
})

test("solve equation2", () => {
    expect(solveEquation2(292, [11, 6, 16, 20])).toBe(true)

    expect(solveEquation2(3267, [81, 40, 27])).toBe(true)

    expect(solveEquation2(7290, [6, 8, 6, 15])).toBe(true)

    expect(solveEquation2(161011, [16, 10, 13])).toBe(false)
})

test("solution1", () => {
    expect(solution1(data)).toBe(3749) 
});

test("cut", () => {
    expect(cut('4680', '80')).toBe('46')

    expect(cut('4076000', '6')).toBe(null)
})

test("solution2", () => {
    expect(solution2(data)).toBe(11387)
});