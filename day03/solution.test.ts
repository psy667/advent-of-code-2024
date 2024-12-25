import { expect, test } from "bun:test";

import { solution1, solution2 } from "./solution.ts";

test("solution1", () => {
    expect(solution1(`xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`)).toBe(161) 
});


test("solution2", () => {
    expect(solution2(`xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`)).toBe(48)
});
// test("solution2", () => {
//     expect(solution2(`
// 7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9
// `)).toBe(4) 
// });

// test("array variations", () => {
//     expect(arrayVariations([1,2,3,4])).toEqual([
//         [2,3,4],
//         [1,3,4],
//         [1,2,4],
//         [1,2,3]
//     ])
// })