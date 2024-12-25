import { split } from '../utils';
import { str, flow, arr, obj } from '../utils/liskor';

const parse = flow.pipe(
    str.split('\n'),
    arr.map(
        split('-'),
    ),
    arr.map(
        flow.fork(
            flow.fork(arr.at(0), arr.at(-1),),
            flow.fork(arr.at(-1), arr.at(0))
        ),
    ),
    arr.flat(),
    arr.groupBy(arr.at(0)),
    obj.mapValues(flow.pipe(
        arr.map(arr.at(1)),
        arr.uniq()
    )),
)

export function solution1(input: string) {
    const graph = parse(input)

    const findTriplet = (val) => {
        const res = [];

        const iter = (it, depth, acc) => {
            if(depth === 1) {
                if(graph[it].includes(val)) {
                    res.push(acc)
                }
                return null
            }
            graph[it].forEach(t => iter(t, depth - 1, acc.concat(t)))
        }

        iter(val, 3, [val])
        return res
    }

    return flow.pipe(
        obj.keys(),
        arr.map(findTriplet),
        arr.flat(),
        arr.map(
            arr.sort(),
            arr.join(':')
        ),
        arr.uniq(),
        arr.map(
            str.split(':')
        ),
        arr.count(
            arr.some(
                str.startsWith('t')
            )
        )
    )(graph)
}

export function solution2(input: string) {
    const graph = parse(input)

    function findLargestInterconnectedSet(start) {
        const set = new Set()

        set.add(start)
        let nodes = graph[start]

        const r = arr.map(
            a => flow.pipe(
                (it: string) => graph[it],
                arr.filter(x => nodes.includes(x)),
                it => it.concat(a, start),
            )(a),
            arr.toSet(),
        )(nodes);

        const res = flow.pipe(
            arr.map(
                it => r.filter(x => x.has(it)),
                arr.reverse(),
                arr.reduce((a) => c => a.intersection(c)),
            ),
            arr.findMax(it => it.size),
        )(nodes)

        return res
    }
    
    return flow.pipe(
        obj.keys(),
        arr.map(findLargestInterconnectedSet),
        arr.findMax(it => it.size),
        arr.fromIter(),
        arr.sort(),
        arr.join(','),
    )(graph)
}