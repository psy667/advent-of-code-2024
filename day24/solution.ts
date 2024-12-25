import { arr, flow, fn, obj, str } from "../utils/liskor";
import { toString, padStart } from '../utils/index';

export const parse = flow.pipe(
    str.split('\n\n'),
    flow.apply(
        flow.pipe(
            str.split('\n'),
            arr.map(
                str.split(': '),
                flow.apply(
                    fn.id,
                    str.toInt()
                ),
            ),
            obj.fromEntries()
        ),
        flow.pipe(
            str.split('\n'),
            arr.map(
                str.split(' -> '),
                flow.apply(
                    str.split(' '),
                    fn.id
                ),
                arr.flat(),
                flow.fork(
                    arr.at(-1),
                    arr.take(3),
                ),
            ),
            obj.fromEntries()
        )
    )
)

export function solution1(input: string) {
    const data = parse(input);

    const state = flow.pipe(
        (([init, gates]) => 
            flow.pipe(
                flow.of(init),
                obj.keys(),
                arr.concat(
                    flow.of(gates), 
                    obj.keys(),
                ),
                arr.map(
                    flow.fork(
                        fn.id,
                        it => obj.getOrDef(it, null)(init)
                    )
                ),
                obj.fromEntries(),
            )(null)
        ),
    )(data)

    const gates = data[1];

    const ALU = {
        XOR: (a,b) => a ^ b,
        OR: (a,b) => a | b,
        AND: (a,b) => a & b,
    }

    let c = 0;

    const tree = {}

    const iter = () => {
        c++;
        // console.log("LAYER", c)
        Object.entries(gates).filter(([k,v]) => 
            (state[v[0]] !== null && state[v[2]] !== null && state[k] === null)
        ).forEach(([k,v]) => {
            
            const a = state[v[0]]
            const b = state[v[2]]

            if(c === 1) {
                tree[v[0]] = v[0];
                tree[v[2]] = v[2];
                // tree[v[0]] = a;
                // tree[v[2]] = b; 
            } 
            tree[k] = `${v[1]}(${tree[v[0]]}, ${tree[v[2]]})`

            const res = ALU[v[1]](a, b)
            // console.log(`${k} = ${v.join(' ')} (${a} ${v[1]} ${b} = ${res})`)
            state[k] = res
        })
    }
    while(Object.values(state).includes(null)) {
        iter()
    }

    // console.log(flow.from(tree)(
    //     obj.entries(),
    //     arr.sort('asc', arr.at(0)),
    //     arr.map(arr.at(1), str.take(20)),
    //     arr.join('\n,')
        
    // ))


    return flow.from(state)(
        obj.entries(),
        arr.filter(
            arr.at(0),
            str.startsWith('z'),
        ),
        arr.sort('desc', flow.pipe(
            arr.at(0),
            str.skip(1),
            str.take(2),
        )),
        arr.map(
            arr.at(1)
        ),
        arr.join(''),
        str.toInt(2),
    )


    // console.log({state})



    // console.log({state})
}

// export function solution2(input: string) {
//     const data = parse(input);

//     const state = flow.pipe(
//         (([init, gates]) => 
//             flow.pipe(
//                 flow.of(init),
//                 obj.keys(),
//                 arr.concat(
//                     flow.of(gates), 
//                     obj.keys(),
//                 ),
//                 arr.map(
//                     flow.fork(
//                         fn.id,
//                         it => init[it] === undefined ? null : 1, // set all 1 to init values
//                         // it => obj.getOrDef(it, null)(init)
//                     )
//                 ),
//                 obj.fromEntries(),
//             )(null)
//         ),
//     )(data)

//     const gates = data[1];

//     const ALU = {
//         XOR: (a,b) => a ^ b,
//         OR: (a,b) => a | b,
//         AND: (a,b) => a & b,
//     }


//     let c = 0;

//     const tree = {}

//     const layers = [];

//     const dict = {};
//     const d = {}

//     const iter = () => {
//         c++;
//         layers[c] = [];
//         // console.log("LAYER", c)
//         Object.entries(gates).filter(([k,v]) => 
//             (state[v[0]] !== null && state[v[2]] !== null && state[k] === null)
//         ).forEach(([k,v], idx) => {
//             // const newKey = `z${c}_${idx}`
            
//             // dict[k] = newKey;
//             layers[c].push(k)

           
//             const a = state[v[0]]
//             const b = state[v[2]]

//             if(c === 1) {
//                 tree[v[0]] = [v[0]];
//                 tree[v[2]] = [v[2]];

//                 d[v[0]] = {
//                     k: v[0],
//                     level: 0,
//                     a: null,
//                     b: null,
//                     value: state[v[0]],
//                     formula: v[0]
//                 }

//                 d[v[2]] = {
//                     k: v[2],
//                     level: 0,
//                     a: null,
//                     b: null,
//                     value: state[v[2]],
//                     formula: v[2]
//                 }
//                 // tree[v[0]] = a;
//                 // tree[v[2]] = b; 
//             } 

            

//             // tree[k] = [tree[v[0]], tree[v[2]]].flat()
//             tree[k] = [v[0], v[2]]
//             // tree[k] = `${v[1]}(${tree[v[0]]}, ${tree[v[2]]})`

//             const res = ALU[v[1]](a, b)

//             d[k] = {
//                 k: k,
//                 level: c,
//                 a: d[v[0]],
//                 b: d[v[2]],
//                 value: res,
//                 op: v[1],
//                 formula: `${v[1]}(${d[v[0]].formula}, ${d[v[2]].formula})`
//             }
//             // console.log(`${k} = ${v.join(' ')} (${a} ${v[1]} ${b} = ${res})`)
//             state[k] = res
//         })
//     }

//     while(Object.values(state).includes(null)) {
//         iter()
//     }

//     // console.log(
//     //     flow.from(layers)(
//     //         str.skip(1),
//     //         arr.map(
//     //             // arr.map(it => dict[it] ?? it)
//     //         )
//     //     )
//     // )

//     const getSC = (n) => {
//         const str = n.toString().padStart(2, '0')
//         const prevNStr = (n-1).toString().padStart(2, '0')
        
       
//         // return `XOR(XOR(${}))`

    
//         // z04: XOR(XOR(y04, x04), OR(AND(y03, x03), AND(OR(AND(x02, y02), AND(OR(AND(y01, x01), AND(XOR(x01, y01), AND(y00, x00))), XOR(x02, y02))), XOR(y03, x03))))
//         // z03: XOR(XOR(y03, x03), OR(AND(x02, y02), AND(OR(AND(y01, x01), AND(XOR(x01, y01), AND(y00, x00))), XOR(x02, y02))))
//         // z02: XOR(XOR(x02, y02), OR(AND(y01, x01), AND(XOR(x01, y01), AND(y00, x00))))
//         // z01: XOR(XOR(x01, y01), AND(y00, x00))

//         // return `XOR(XOR(x${str}, y${str}), OR(AND(y${str1}, x${str1}), AND(OR(AND(x${str2}, y02), )`
        
//         const S = {
//             val: {
//                 op: "XOR",
//                 a: `x${str}`,
//                 b: `y${str}`
//             }
//         };

//         if(n === 1) {
//             const C = {
//                 val: {
//                     op: "AND",
//                     a: "x00",
//                     b: "y00",
//                 }

//             }

//             return {
//                 val: {
//                     op: "XOR",
//                     a: C,
//                     b: S,
//                 },
//                 S: S,
//                 C: C,
//             }
//         }
        
//         const prev = getSC(n-1)
        
//         const C = {
//             val: {
//                 op: "OR",
//                 a: {
//                     val: {
//                         op: "AND",
//                         a: `x${prevNStr}`,
//                         b: `y${prevNStr}`
//                     }
                
//                 },
//                 b: {
//                     val: {
//                         op: "AND",
//                         a: prev.S,
//                         b: prev.C
//                     }
                    
//                 }
//             }
//         }

//         return {
//             val: {
//                 op: "XOR",
//                 a: S,
//                 b: C,
//             },
//             S,
//             C
//         }
//         // return {
//         //     S: `XOR(x${str}, y${str})`,
//         //     C: `OR(AND(y01, x01), AND(${prev.S}, ${prev.C}))`
//         // }
//     }

//     const astToStr = (node) => {
//         if(typeof node === 'string') {
//             return node
//         }
//         return `${node.val.op}(${astToStr(node.val.a)}, ${astToStr(node.val.b)})`
//     }

//     const compareAST = (a, b) => {
//         return astToStr(a).length === astToStr(b).length
//     }


//     // console.log(astToStr(getSC(3)))

//     const getC = (n) => {
//         const str = n.toString().padStart(2, '0')

//         if(n === 0) {
//             return `AND(y00, x00)`
//         }

//         return `OR(AND(y${str}, x${str}), AND(OR(x${str}, y${str}), AND(y00, x00)))` 
//     }

    
//        const nodes = flow.from(d)(
//             obj.values(),
//             arr.filter(it => it.level),
//             arr.sort('asc', it => it.k),
//             // arr.map(it => [it.k, it.value]),
//             // str.skip(100),
//             // arr.take(20),
//             arr.flatMap(it => [`${it.a.k} --> ${it.k}`, `${it.b.k} --> ${it.k}`]),
//             arr.sort(),
//             // arr.filter(it => it.k === "z05")
//             // arr.filter(
//             //     it => it.level > 0 && it.level < 5 && ((it.level !== it.a.level + 1) || (it.level !== it.b.level + 1))
//             // )
//             // arr.join('\n'),
//         )

//         // const start = nodes.filter(it => it.startsWith('x') || it.startsWith('y'))
//         // const end = nodes.filter(it => !it.startsWith('x') && !it.startsWith('y')) 

//         //    const mermaid = `graph TD\n`
//     // +  '\n' + ([...start, ...end].map(it => `\t${it}`).join('\n'))

//     //    (flow.from(d)(
//     //     obj.values(),
//     //     arr.filter(it => it.level),
//     //     // arr.map(it => [it.k, it.value]),
//     //     arr.map(it => `\t${it.k}[${it.op} ${it.k}]`),
//     //     // arr.filter(it => it.k === "z05")
//     //     // arr.filter(
//     //     //     it => it.level > 0 && it.level < 5 && ((it.level !== it.a.level + 1) || (it.level !== it.b.level + 1))
//     //     // )
//     //     arr.join('\n'))) 
//     const res = (flow.from(d)(
//         obj.values(),
//         arr.filter(it => it.level),
//         // arr.map(it => [it.k, it.value]),
//         // str.skip(100),
//         // arr.take(20),
//         arr.filter(it => it.k.startsWith("z04")),
//         arr.sort('asc', it => it.k),
//         // str.skip(1),
//         // arr.take(1),
//         // arr.filter(it => it.formula.length !== astToStr(getSC(parseInt(it.k.slice(1)))).length),
//         // str.skip(1),
//         arr.take(1),
//         arr.map(it => [
//             it,
//             // it.formula,
//             // astToStr(getSC(parseInt(it.k.slice(1))))
//         ]),
//         str.toJSON()
//         // arr.filter(
//         //     it => it.level > 0 && it.level < 5 && ((it.level !== it.a.level + 1) || (it.level !== it.b.level + 1))
//         // )
//         // arr.join('\n')
//     ))

//     console.log(res)

//     // console.log(str.toJSON()(getSC(4)))

//     // Bun.file('mermaid.txt').writer().write(mermaid)
//     // console.log(flow.from(tree)(
//     //     obj.entries(),
//     //     arr.map(flow.fork(
//     //         flow.pipe(
//     //             arr.at(0),
//     //             // it => dict[it] ?? it
//     //         ),
//     //         flow.pipe(
//     //             arr.at(1),
//     //             // arr.map(it => dict[it] ?? it)
//     //             // arr.sort(),
//     //         ),
//     //     )),
//     //     arr.sort('asc', flow.pipe(arr.at(0), str.split(' '), arr.at(0), str.skip(1), str.toInt())),
//     //     obj.fromEntries()
//     // ))
// }


export function solution2(input: string) {
    const [_, gates] = parse(input);
    const swaps = new Set();
    
    function getNode(op, a, b) {
        return Object.entries(gates).find(([k, it]) => it[1] === op && ((it[0] === a && it[2] === b) || (it[0] === b && it[2] === a)))?.[0] ?? null;
    }
    let ci = getNode('AND', 'x00', 'y00');

    function swap(a, b) {
        const t = gates[a]
        gates[a] = gates[b]
        gates[b] = t
        swaps.add(a)
        swaps.add(b)
    }

    for(let i = 1; i < 45; i++) {
        const n = i.toString().padStart(2, '0');

        const x = 'x'+n;
        const y = 'y'+n;


        let xor1 = getNode('XOR', x, y)
        let and1 = getNode('AND', x, y)

        if(!xor1) {
            console.log("NO XOR1", x,y)
        }

        if(!and1) {
            console.log("NO AND1", x,y)
        }

        let and2 = getNode('AND', xor1, ci)

        let xor2 = getNode('XOR', xor1, ci) // should be 'z'+n

        if(!and2) {
            swap(xor1, and1)
            ;[xor1, and1] = [and1, xor1]
            and2 = getNode('AND', xor1, ci)
          
        }
       
        if(and1?.startsWith('z')) {
            swap(xor2, and1)
            ;[xor2, and1] = [and1, xor2]
        }

        if(and2?.startsWith('z')) {
            swap(xor2, and2)
            ;[xor2, and2] = [and2, xor2]
        }

        if(ci?.startsWith('z')) {
            swap(ci, xor2)
            ;[ci, xor2] = [xor2, ci]
        }

        let or1 = getNode('OR', and1, and2)

        if(or1.startsWith('z') && !or1.startsWith('z45')) {
            swap(or1, xor2)
            ;[xor2, or1] = [or1, xor2]
        }


        ci = or1;

    }

    return [...swaps].sort().join(',')
}