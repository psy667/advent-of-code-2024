import { fork, pipe, split, takeFirst, takeLast } from "../utils";

export function parse(input: string) {
    return pipe(
        split('\n\n'),
        fork(
            pipe(
                takeFirst,
                split(', '),
            ),
            pipe(
                takeLast,
                split('\n'),  
            )
        )
    )(input)
}

export function solution1(input: string) {
    const [patterns, designs] = parse(input);
    
    function dp(design: string, patterns: string[], idx, memo) {
        if(idx === design.length) {
            return 1
        }

        if(!(idx in memo)) {
            patterns.forEach((pattern) => {
                if(design.slice(idx, idx + pattern.length) === pattern) {

                    memo[idx] = (memo[idx] || 0) + dp(design, patterns, idx + pattern.length, memo)
                }
            })
        }

        return memo[idx] || 0
    }

    return designs.map(it => dp(it, patterns, 0, {}))
        .filter(it => it)
        .length

}

export function solution2(input: string) {
    const [patterns, designs] = parse(input);
    
    function dp(design: string, patterns: string[], idx, memo) {
        if(idx === design.length) {
            return 1
        }

        if(!(idx in memo)) {
            patterns.forEach((pattern) => {
                if(design.slice(idx, idx + pattern.length) === pattern) {

                    memo[idx] = (memo[idx] || 0) + dp(design, patterns, idx + pattern.length, memo)
                }
            })
        }

        return memo[idx] || 0
    }

    return designs.map(it => dp(it, patterns, 0, {}))
        .reduce((a,c) => a + c, 0)
}