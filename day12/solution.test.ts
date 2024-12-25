import { expect, test, mock, spyOn } from "bun:test";

import { solution1, solution2 } from "./solution.ts";
import * as checks from "../utils/checks.ts";


const data = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`

test.skip("solution1", () => {
    expect(solution1(data)).toBe(1930) 
});


test("solution2", () => {
   expect(solution2(data)).toEqual(1206)
});