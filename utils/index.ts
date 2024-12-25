import fs from 'fs'
export const readFile = (path) => {
  return fs.readFileSync(path, 'utf8').toString()
}
export const writeFile = (path) => (data) => {
  fs.writeFileSync(path, data)
  return data
}
const storage = new Map()
export function ø(...args) {
  return (init) => {
    return args.reduce(
      (acc, cur) => cur(acc),
      init
    )
  }
}
export const pipe = ø
export const arr =
  (...args) =>
  (it) =>
    args.map((fn) => fn(it))
export const slice = (from: number, to?: number) => (it) =>
  it.slice(from, to)
export const parseJSON = (it) => JSON.parse(it)
export const mapByKey = (key, def, fn) => (obj) =>
  (obj[key] = fn(obj[key] ?? def)) && obj
// mapByKeyWithDefault(5, 0, it => it + 1)
export const spreadParams = (fn) => (arr) =>
  fn(...arr)
// export function of(value) {
//   return (...args) => {
//     // @ts-ignore
//     return args.reduce(
//       (acc, cur) => cur(acc),
//       value
//     )
//   }
// }
export const of =
  (...args) =>
  (_) =>
    args
export const main = (it) => {
  try {
    return it()
  } catch (e) {
    console.error('\x1b[31m', e.message)
  }
}
export const split = (sep) => (it) =>
  it.split(sep)
export const splitByLine = () => (it) => it.split('\n')
export const toInt = (it) => parseInt(it)
export const join = (sep) => (arr) =>
  arr.join(sep)
export const filter = (fn) => (arr) =>
  arr.filter(fn)
export const find = (fn) => (arr) => arr.find(fn)
export const toBoolean = (it) => !!it
export const takeFirst = (it) => it.at(0)
export const takeLast = (it) => it.at(-1)
export const at = (n) => (it) => it.at(n)
export const print = (it) => console.log(it)
export const log =
  (prefix = '') =>
  (it) =>
    also((it) =>
      prefix
        ? console.dir(
            { [prefix]: it },
            { depth: 10 }
          )
        : console.dir(it, { depth: 10 })
    )(it)
export const also = (fn) => (it) => {
  fn(it)
  return it
}
export const pick = (key) => (it) => it[key]
export const toObj = (key) => (it) => ({
  [key]: it,
})
export const mergeObj = (arr) =>
  arr.reduce(
    (acc, cur) => ({ ...acc, ...cur }),
    {}
  )
export const trim = (it) => it.trim()
export function map(...fns) {
  return (arr) =>
    arr.map((it) =>
      fns.reduce((acc, fn) => fn(acc), it)
    )
}
export const zip = (fn) => (arrs) => {
  const [arr1, arr2] = arrs;

  return arr1.map((it, idx) => fn(it, arr2[idx]))
}
export const replace = (from, to) => (it) =>
  it.replaceAll(from, to)
// export function fold<K, T>(arr: () => K[], fn: (acc: T, cur: K, idx: number) => T): (it: T) => T {
//     return function(it){
//         return arr().reduce((acc,cur, idx) => fn(acc, cur, idx), it)
//     }
// }
export function reduce(fn) {
  return function (arr) {
    return arr.reduce((acc, cur, idx) =>
      fn(acc, cur, idx)
    )
  }
}
export function fold(init, fn) {
  return function (arr) {
    return arr.reduce(
      (acc, cur, idx) => fn(acc, cur, idx),
      init
    )
  }
}
export function entries(it) {
  return Object.entries(it)
}
export const fork = (fn1, fn2) => (it) => [
  fn1(it),
  fn2(it),
]
export const combine = (fn) => ([a,b]) => fn(a)(b)
export const zipApply =
  (...fns) =>
  (arr) =>
    fns.map((fn, idx) => fn(arr[idx]))
export const str = (s) => (it) =>
  s.replaceAll('%', it)
export const isRound = (it) => Math.round(it) === it;
export const isInt = (it) => Number.isInteger(it)
export const isPositive = (it) => it >= 0;
export const isFloat = (it) =>
  Number.isFinite(it) && !Number.isInteger(it)
export const isNumber = it => Number.isFinite(it)
export const isStringNumber = it => Number.isFinite(Number(it))
export const toString = (it) => it.toString()
export const toUpper = (it) => it.toUpperCase()
export const toLower = (it) => it.toLowerCase()
export const toHex = (it) => it.toString(16)
export const id = (it) => it
export const sum = (a, b) => a + b
export const incr = (it) => it + 1
export const decr = (it) => it - 1
export const plus = (val) => (it) => it + val
export const add = (val) => (it) => it + val
export const sub = (val) => (it) => it - val
export const minus = (val) => (it) => it - val
export const mul = (val) => (it) => it * val
export const div = (val) => (it) => it / val
export const mod = (val) => (it) => it % val
export const pow = (val) => (it) => it ** val
export const eq = (val) => (it) => it === val
export const lt = (val) => (it) => it < val
export const gt = (val) => (it) => it > val
export const lte = (val) => (it) => it <= val
export const gte = (val) => (it) => it >= val
export const op = (fn) => (it) => fn(it)
export const comp =
  (fn) =>
  ([a, b]) =>
    fn(a)(b)
export const padStart = (len, char) => (it) =>
  it.padStart(len, char)
export const round = (it) => Math.round(it)
export const floor = (it) => Math.floor(it)
export const ceil = (it) => Math.ceil(it)
export const isEven = ø(mod(2), eq(0))
export const isOdd = ø(mod(2), eq(1))
export const val = (it) => () => it
export const append = (val) => (arr) =>
  arr.concat(val)
export const prepend = (val) => (arr) => [
  val,
  ...arr,
]
export const reverse = (arr) => arr.reverse()

export const ifElse =
  (cond, then, otherwise) => (it) =>
    cond(it) ? then(it) : otherwise(it)
export const set = (key) => (it) =>
  storage.set(key, it)
// export const get = (key) => () => storage.get(key)
export const keys = (obj) => Object.keys(obj)
export const values = (obj) => Object.values(obj)
export const vars = {}

export const func = (...args) => {
  const [fnName, fn] = args
  vars[fnName] = (it) => fn(it)
  return (it) => it
}

export const get = (key) => (obj) => {
  if (!key) return obj
  const path = key.split('.')
  return path.reduce((acc, cur) => acc[cur], obj)
}
export const assert = (text, fn) => (it) => {
  if (!fn(it)) {
    throw new Error(`Assertion failed: ${text}`)
  }
  return it
}
export const Type = {
  string: 'string',
  number: 'number',
  boolean: 'boolean',
  object: 'object',
  function: 'function',
  undefined: 'undefined',
  null: 'null',
  array: 'array',
  date: 'date',
  regexp: 'regexp',
  symbol: 'symbol',
  bigint: 'bigint',
}

export const is = (type) => (it) => {
  const typeofIt = typeof it
  if (type === Type.array) {
    return Array.isArray(it)
  }
  if (type === Type.date) {
    return it instanceof Date
  }
  if (type === Type.regexp) {
    return it instanceof RegExp
  }
  return typeofIt === type
}

/*
usage:
const isEven = match([
[is(Type.number), log('number')],
[is(Type.string), log('string')],
[is(Type.array), log('array')],
[is(Type.object), log('object')],
[is(Type.function), log('function')],
],log('default'));
*/
export const patternMatch =
  (arr, def) => (it) => {
    const finded = arr.find((fn) => fn.at(0)(it))
    if (finded) {
      return finded.at(1)(it)
    } else {
      return def(it)
    }
  }

export const every = (fn) => (arr) =>
  arr.every(fn)
export const some = (fn) => (arr) => arr.some(fn)
export const not = (it) => !it
export const and = (a, b) => a && b
export const isTrue = (it) => it === true
export const isFalse = (it) => it === false
export const intersect = (a, b) =>
  a.filter((it) => b.includes(it))
export const size = (it) => it.length
export const whenOld =
  (cond) =>
  (...args) =>
  (it) => {
    const arr = args.map((fn) => fn(cond(it)))
    const finded = arr.find((it) => it.res)
    if (finded) {
      return finded.fn(it)
    } else {
      return it
    }
  }
export const when =
  (...args) =>
  (it) => {
    // const arr = args.map((fn) => fn(it))
    const finded = args
      .at(0)(it)
      .find((it) => it[0])
    return finded[1]
  }
export const match = (check, then) => (val) => {
  if (check(val)) {
    return { res: true, fn: then }
  } else {
    return { res: false, fn: id }
  }
}
export const toSortedAsc = () => (arr) => {
  const newArr = arr.slice(0)
  newArr.sort((a, b) => a - b)
  return newArr
}
export const sort =
  (order = 'asc') =>
  (arr) => {
    return arr.slice(0).sort((a, b) => {
      if (a < b) {
        return order === 'asc' ? -1 : 1
      }
      if (a > b) {
        return order === 'asc' ? 1 : -1
      }
      return 0
    })
  }
export const slidingWindow = (size) => (arr) => {
  return arr
    .slice(0, -size + 1)
    .map((_, idx) => arr.slice(idx, idx + size))
}
export const findMax = (selector = id) => (arr) =>
  arr.reduce((a, c) => (selector(c) > selector(a) ? c : a))
export const findMin = (selector = id) => (arr) =>
  arr.reduce((a, c) => (selector(c) < selector(a) ? c : a))

export const countValues = (arr) => {
  const counts = {};

  arr.forEach(it => {
    counts[it] = (counts[it] ?? 0) + 1
  })

  return counts
}

export const getOrDefault = (key, defaultValue) => obj => obj?.[key] ?? defaultValue


export const measure = async <T>(fn: () => T): Promise<[T, number]> => {
    const start = performance.now();
    const result = await fn()
    const end = performance.now();
    return [result, Math.round(end - start)]
}

export const measureSync = <T>(fn: () => T): [T, number] => {
  const start = performance.now();
  const result = fn()
  const end = performance.now();
  return [result, Math.round(end - start)]
}
