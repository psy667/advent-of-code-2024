import { expect, test } from "bun:test";

import { solution1, solution2 } from "./solution.ts";

const data = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`

const data2 = `1-2
1-3
1-4
1-5
1-6
2-3
3-4
4-5
4-6
5-6
`

test.skip("solution1", () => {
    expect(solution1(data)).toBe(7) 
});


test("solution2", () => {
    expect(solution2(data2)).toBe('1,4,5,6')
    // expect(solution2(data2)).toBe('co,de,ka,ta')
});