import { isStringNumber, reduce, minus, every, func, assert } from './index';

export const str = {
    split: (separator: string) => (val: string) => val.split(separator),
    isStringNumber: () => (val: string) => !Number.isNaN(Number(val)),
    at: (idx: number) => (val: string) => val.at(idx),
    toInt: <T extends string>(radix = 10) => (val: T) => parseInt(val, radix),
    toFloat: <T extends string>() => (val: T) => parseFloat(val),
    startsWith: (it) => val => val.startsWith(it),
    endsWith: (it) => val => val.endsWith(it),
    skip: (n) => val => val.slice(n),
    take: (n) => val => val.slice(0, n),
    toJSON: () => val => JSON.stringify(val, null, 2),
    fromJSON: () => val => JSON.parse(val),
}




const id = x => x


type Func<T, R> = (arg: T) => R;
type IdFn<T> = Func<T, T>

function pipe<T>(): Func<T, T>;
function pipe<T, A>(f1: Func<T, A>): Func<T, A>;
function pipe<T, A, B>(f1: Func<T, A>, f2: Func<A, B>): Func<T, B>;
function pipe<T, A, B, C>(f1: Func<T, A>, f2: Func<A, B>, f3: Func<B, C>): Func<T, C>;
function pipe<T, A, B, C, D>(f1: Func<T, A>, f2: Func<A, B>, f3: Func<B, C>, f4: Func<C, D>): Func<T, D>;
function pipe<T, A, B, C, D, E>(f1: Func<T, A>, f2: Func<A, B>, f3: Func<B, C>, f4: Func<C, D>, f5: Func<D, E>): Func<T, E>;
function pipe<T, A, B, C, D, E, F>(f1: Func<T, A>, f2: Func<A, B>, f3: Func<B, C>, f4: Func<C, D>, f5: Func<D, E>, f6: Func<E, F>): Func<T, F>;
function pipe<T, A, B, C, D, E, F, G>(f1: Func<T, A>, f2: Func<A, B>, f3: Func<B, C>, f4: Func<C, D>, f5: Func<D, E>, f6: Func<E, F>, f7: Func<F, G>): Func<T, G>;
function pipe<T, A, B, C, D, E, F, G, H>(f1: Func<T, A>, f2: Func<A, B>, f3: Func<B, C>, f4: Func<C, D>, f5: Func<D, E>, f6: Func<E, F>, f7: Func<F, G>, f8: Func<G, H>): Func<T, H>;
function pipe<T, A, B, C, D, E, F, G, H, I>(f1: Func<T, A>, f2: Func<A, B>, f3: Func<B, C>, f4: Func<C, D>, f5: Func<D, E>, f6: Func<E, F>, f7: Func<F, G>, f8: Func<G, H>, f9: Func<H, I>): Func<T, I>;
function pipe<T, A, B, C, D, E, F, G, H, I, J>(f1: Func<T, A>, f2: Func<A, B>, f3: Func<B, C>, f4: Func<C, D>, f5: Func<D, E>, f6: Func<E, F>, f7: Func<F, G>, f8: Func<G, H>, f9: Func<H, I>, f10: Func<I, J>): Func<T, J>;
function pipe<T>(...fns: Array<Func<any, any>>): Func<T, any> {
  return (x: T) => fns.reduce((v, f) => f(v), x);
}


export const arr = {
    map: <T>(...fns) => (arr: T[]) =>
        arr.map(flow.pipe(...fns)),
    flatMap: <T>(...fns) => (arr: T[]) =>
        arr.flatMap(flow.pipe(...fns)),
    flat: <T>(depth?: number) => (arr: T[]) => arr.flat(depth),
    filter: <T>(...fns) => (arr: T[]) =>
        arr.filter(flow.pipe(...fns)
    ),
    reduce: (fn) => arr => arr.reduce((acc,cur) => fn(acc)(cur)),
    fold: (init, fn) => arr => arr.reduce((acc,cur) => fn(acc)(cur), init),
    sum: () => arr => arr.reduce((acc,cur) => acc + cur, 0),
    join: <T>(separator: string) => (arr: T[]) => arr.join(separator),
    sort: <T>(order = 'asc', selector = id) =>
        (arr: T[]) => arr.toSorted((a, b) => {
            const aa = selector(a)
            const bb = selector(b)
            if (aa < bb) {
              return order === 'asc' ? -1 : 1
            }
            if (aa > bb) {
              return order === 'asc' ? 1 : -1
            }
            return 0
          }),
    // TODO: ...fns
    zip: (fn) => ([arr1, arr2]) => arr1.map((it, idx) => fn(it)(arr2[idx])),
    groupBy: (selector) => val => Object.groupBy(val, selector),
    at: (idx: number) => (val) => val.at(idx),
    toSet: () => val => new Set(val),
    uniq: () => val => [...new Set(val)],
    has: <T>(value) => (val: T[]) => val.findIndex(it => it === value) !== -1,
    count: <T>(...fns) => (arr: T[]) =>
        arr.filter((it) =>  fns.reduce((acc, fn) => fn(acc), it)).length,
    some: <T>(...fns) => (arr: T[]) =>
        arr.some((it) =>  fns.reduce((acc, fn) => fn(acc), it)),
    every: <T>(...fns) => (arr: T[]) =>
        arr.every((it) =>  fns.reduce((acc, fn) => fn(acc), it)),
    take: <T>(n) => (arr: T[]) => arr.slice(0, n),
    fromIter: <T>() => (iter) => [...iter],
    findMax: <T>(selector = id) => (arr: T[]) => {
        let max = -Infinity;
        let item = null;

        arr.forEach(it => {
            const v = selector(it) 
            if(v > max) {
                max = v
                item = it
            }
        })

        return item;
    },
    findMin: <T>(selector = id) => (arr: T[]) => {
        let min = Infinity;
        let item = null;

        arr.forEach(it => {
            const v = selector(it) 
            if(v < min) {
                min = v
                item = it
            }
        })

        return item;
    },
    reverse: <T>() => (arr: T[]) => arr.toReversed(),
    concat: <T>(...fns) => (arr: T[]) =>
        arr.concat(flow.pipe(...fns)(arr)),
}

const uncurry = fn => (...args) => {
    const r = fn(args[0])
    console.log({fn, args, r})

    if(args.length === 1) {
        return fn(args[0])
    } else {
        return uncurry(fn(args[0]))(...args.slice(1))
    }
}

const curry = (fn) => {
    const n = fn.length;

    if(n === 1) {
        return (a) => fn(a)
    }
    if(n === 2) {
        return a => b => fn(a,b)
    }
    if(n === 3) {
        return a => b => c => fn(a,b,c)
    }
}

export const of = (val) => () => val;



export const flow = {
    pipe: pipe,
    fork: <T>(...fns) => (val: T) => fns.map((fn) => fn(val)),
    apply: <T>(...fns) => (vals: T[]) => fns.map((fn, idx) => fn(vals[idx])),
    of: of,
    from: (val) => (...fns) => pipe(
        ...fns
    )(val)
}


export const num = {
    plus: a => b => a + b,
    subFrom: a => b => a - b,
    sub: a => b => b - a,
    mul: a => b => a * b,
    divBy: a => b => b / a,
    div: a => b => a / b,
    abs: () => val => Math.abs(val),
}

export const obj = {
    fromEntries: () => val => Object.fromEntries(val),
    entries: () => val => Object.entries(val),
    keys: () => val => Object.keys(val),
    values: () => val => Object.values(val),
    mapValues: (fn) => val => Object.fromEntries(Object.entries(val).map(([k,v]) => [k, fn(v)])),
    mapKeys: (fn) => val => Object.fromEntries(Object.entries(val).map(([k,v]) => [fn(k), v])),
    getOrDef: (key, def) => obj => obj[key] ?? def,
}

export const fn = {
    id,
    curry,
    uncurry,
}

// return pipe(
//     splitByLine(),
//     map(pipe(
//         split(''),
//         filter(isStringNumber),
//         join('')
//     )),
//     map(it => takeFirst(it) + takeLast(it)),
//     map(toInt),
//     reduce(sum)
// )(input)



const sol1 = flow.pipe(
    str.split('\n'),
    arr.map(
        str.split(''),
        arr.filter(str.isStringNumber),
        arr.join('')
    ),
    arr.map(
        flow.fork(
            str.at(0),
            str.at(-1)
        ),
        arr.join(''),
        str.toInt(),
    ),
    arr.sum(),
)

// export function solution1(input: string) {
//     return pipe(
//         splitByLine(),
//         map(pipe(
//             split('   '),
//             map(toInt)
//         )),
//         fork(
//             map(takeFirst),
//             map(takeLast)
//         ),
//         map(sort('asc')),
//         zip((x,y) => Math.abs(x - y)),
//         fold(0, sum)
//     )(input)
// }

// const sum = arr.fold(0, (a) => (b) => {
//     console.log(a,b)
//     return uncurry(num.plus)(a,b)
// })

const sol2 = flow.pipe(
    (it: string) => it,
    str.split('\n'),
    arr.map(
        str.toInt(),
    ),
    arr.map(
        str.split('   '),
        arr.map(str.toInt()),
    ),
    flow.fork(
        arr.map(str.at(0)),
        arr.map(str.at(-1))
    ),
    arr.map(arr.sort('asc')),
    arr.zip(num.sub),
    arr.map(num.abs()),
)

// console.log(sol2(`3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3`))