import { expect, test } from "bun:test";

import { solution1, solution2 } from "./solution.ts";

const data = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`

test("solution1", () => {
    expect(solution1(data)).toBe(1) 
});


test.skip("solution2", () => {
    expect(solution2(data)).toBe(0)
});