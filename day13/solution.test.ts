import { expect, test } from "bun:test";

import { f1, f2, parse, solution1, solution2 } from "./solution.ts";

const data = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`

test("parse", () => {
    expect(parse(data)).toEqual([
        {
            a: [94, 34],
            b: [22, 67],
            prize: [8400, 5400]
        },
        {
            a: [26, 66],
            b: [67, 21],
            prize: [12748, 12176]
        },
        {
            a: [17, 86],
            b: [84, 37],
            prize: [7870, 6450]
        },
        {
            a: [69, 23],
            b: [27, 71],
            prize: [18641, 10279]
        },
    ])
})

test("f1", () => {
    expect(f1([8400, 5400], [94, 34], [22,67])).toEqual([80, 40])
    expect(f1([12748, 12176], [26, 66], [67, 21])).toBe(null)
})

test("f2", () => {
    expect(f2([8400, 5400], [94, 34], [22,67])).toEqual([80, 40])
    expect(f2([12748, 12176], [26, 66], [67, 21])).toBe(null)
})


test("solution1", () => {
    expect(solution1(data)).toBe(480) 
});


test("solution2", () => {
    expect(solution2(data)).toBe(875318608908)
});