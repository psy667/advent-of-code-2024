import { expect, test } from "bun:test";

import { solution1, solution2 } from "./solution.ts";
console.log('\n'.repeat(10) + '='.repeat(40))

const data = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`


test("solution1", () => {
    expect(solution1(data)).toBe(143) 
});


test("solution2", () => {
    expect(solution2(data)).toBe(123)
});