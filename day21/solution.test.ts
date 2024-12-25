import { expect, test } from "bun:test";

import { fromKeyboardToKeyboard, fromNumpadToKeyboard, Key, solution1, solution2 } from "./solution.ts";

const data = `029A
980A
179A
456A
379A`

// test("7 -> 8", () => {
//     expect(fromNumpadToKeyboard('7', '8')).toBe('>A')
// })
// test("7 -> 9", () => {
//     expect(fromNumpadToKeyboard('7', '9')).toBe('>>A')
// })
// test("7 -> 5", () => {
//     expect(fromNumpadToKeyboard('7', '5')).toBe('>vA')
// })
// test("7 -> 0", () => {
//     expect(fromNumpadToKeyboard('7', '0')).toBe('>vvvA')
// })

// test("3 -> 5", () => {
//     expect(fromNumpadToKeyboard('3', '5')).toBe('<^A')
// })

// test("7 -> A", () => {
//     expect(fromNumpadToKeyboard('7', 'A')).toBe('>>vvvA')
// })

// test("A -> 4", () => {
//     expect(fromNumpadToKeyboard('A', '4')).toBe('^^<<A')
// });

// test("7 -> A", () => {
//     expect(fromNumpadToKeyboard('7', 'A')).toBe('>>vvvA')
// })

// test("^ -> >", () => {
//     expect(fromKeyboardToKeyboard('^', '>')).toBe('v>A')
// })

// test("A -> v", () => {
//     expect(fromKeyboardToKeyboard('A', 'v')).toBe('v<A')
// })

// test("A -> <", () => {
//     expect(fromKeyboardToKeyboard('A', '<')).toBe('v<<A')
// });

test("solution1", () => {
    expect(solution1(data)).toBe(126384)
});


test("solution2", () => {
    expect(solution2(data)).toBe(154115708116294)
});