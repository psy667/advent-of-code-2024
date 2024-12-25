const cache = {}

const memo = (fn) => (...args) => {
    const k = args.join(':')
    if(cache[k]) {
        return cache[k]
    } else {
        const v = fn(...args)
        cache[k] = v
        return v
    }
}

export function transform(it: number, n: number) {
    if(n === 0) return 1

    if(it === 0) return memo(transform)(1, n - 1)

    const str = it.toString()
    const len = str.length
    if(len % 2 === 0) {
        return memo(transform)(Number(str.substr(0, len / 2)), n - 1)
        + memo(transform)(Number(str.substr(len / 2)), n - 1)
    }

    return memo(transform)(it * 2024, n - 1)
}

export function solution1(input: string) {
    return input
        .split(' ')
        .map(Number)
        .map(it => transform(it, 25))
        .reduce((a,c) => a + c, 0)
}

export function solution2(input: string) {
    return input
        .split(' ')
        .map(Number)
        .map(it => transform(it, 75))
        .reduce((a,c) => a + c, 0)
}