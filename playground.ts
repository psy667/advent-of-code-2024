import { combine, decr, eq, fold, fork, id, ifElse, log, mul, pipe, spreadParams, val } from "./utils"

const Y = f => x => f(Y(f))(x)

// const decr = Y(fn => it => it === 0 ? 1 : it * fn(it - 1))

const fact = Y(fn => ifElse(
    eq(0),
    val(1),
    pipe(
        fork(
            pipe(
                decr,
                fn
            ),
            id
        ),
        combine(mul)
    )
))


console.log(
fact(10)
)