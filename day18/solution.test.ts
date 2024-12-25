import { expect, test } from "bun:test";

import { solution1, solution2 } from "./solution.ts";

const data = `7,7

5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`

test("solution1", () => {
    expect(solution1(data)).toBe(22) 
});


test("solution2", () => {
    expect(solution2(data)).toBe('6,1')
});