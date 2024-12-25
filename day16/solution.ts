import { map, pipe, split, splitByLine } from "../utils";
import { apply, createMatrix, down, findPos, get, getFrame, left, matrixForEach, matrixMap, printMatrix, right, tuple, up, type Matrix, type Pos } from "../utils/aoc";
import { filter, padStart } from '../utils/index';

export function parse(input: string): Matrix<string> {
    return pipe(
        splitByLine(),
        map(
            split('')
        )
    )(input)
}

export function solution1(input: string) {
    const matrix = parse(input);
    const vertices = []
    const edges = {}
    const distances = {}

    const frame = getFrame(matrix)
    const path = createMatrix<number>(frame, 0)

    
    matrixForEach(matrix, (pos, val) => {
        const [x,y] = pos;
        
        if(matrix[y][x] == '#') return

        const k = pos.join(':')

        const kN = k+':N'
        const kW = k+':W'
        const kS = k+':S'
        const kE = k+':E'

        const up =      [x,     y - 1,  'N'].join(':')
        const down =    [x,     y + 1,  'S'].join(':')
        const left =    [x - 1, y,      'W'].join(':')
        const right =   [x + 1, y,      'E'].join(':')

        vertices.push(kN, kW, kS, kE)

        edges[kN] = (edges[kN] ?? {})
        edges[kW] = (edges[kW] ?? {})
        edges[kE] = (edges[kE] ?? {})
        edges[kS] = (edges[kS] ?? {})
        
        if(matrix[y-1][x] !== '#')
            edges[kN][up] = 1
        
        if(matrix[y][x-1] !== '#')
            edges[kW][left] = 1
        
        if(matrix[y][x+1] !== '#')
            edges[kE][right] = 1
        
        if(matrix[y+1][x] !== '#')
            edges[kS][down] = 1

        ;([[kN, kE, 1000], [kN, kS, 2000], [kN, kW, 1000], [kE, kS, 1000], [kE, kW, 2000], [kS, kW, 1000]] as [string, string, number][]) .forEach(([a, b, w]) => {
            edges[a] = (edges[a] ?? {})
            edges[b] = (edges[b] ?? {})
            edges[a][b] = w
            edges[b][a] = w
        });
    })

    vertices.forEach(it => {
        distances[it] = Infinity
    });

    const start = findPos(matrix, 'S')
    const end = findPos(matrix, 'E') 

    const startK = start[0] + ':' + start[1] + ':' + 'E'
    distances[startK] = 0
    const visited = new Set();
    let unvisited = [];


    function iter(node: string) {
        if(visited.has(node)) {
            return;
        }
        visited.add(node);

        const a = edges[node];
        
        if(!a) return;

        Object.entries(a).forEach(([k, v]) => {
            distances[k] = Math.min(distances[node] + v, distances[k])
            unvisited.push(k)
        })
    }

    unvisited.push(startK)

    while(unvisited.length !== 0) {
        let min = Infinity;
        let minIdx = -1;

        unvisited.forEach((it, idx) => {
            if(it !== null && distances[it] < min) {
                min = distances[it]
                minIdx = idx
            }
        })

        if(minIdx !== -1) {
            const k = unvisited[minIdx];
            unvisited.splice(minIdx, 1)
            iter(k)
        } else {
            break
        }
    }

    // matrixMap(path, ([x,y]) => {
    //     const ds = [
    //         [x,y,'N'],
    //         [x,y,'E'],
    //         [x,y,'W'],
    //         [x,y,'S']
    //     ].map(it => it.join(':')).map(it => (distances[it])).filter(it => it || it === 0)
    //     // console.log(ds)
    //     if(ds.length === 0) {
    //         return ' -----'
    //     }
    //     return Math.min(...ds).toString().padStart(6, ' ')
    // })

    // printMatrix(path)
    const k = end.join(':')

    const kN = k+':N'
    const kW = k+':W'
    const kS = k+':S'
    const kE = k+':E'

    const res = Math.min(...[kN, kW, kS, kE].map(it => distances[it]))

    return res;
}

export function solution2(input: string) {
    const matrix = parse(input);
    const vertices = []
    const edges = {}
    const distances: Record<string, {val: number, prevNodes: string[]}> = {}

    // matrixMap(path, ([x,y]) => {
    //     const ds = [
    //         [x,y,'N'],
    //         [x,y,'E'],
    //         [x,y,'W'],
    //         [x,y,'S']
    //     ].map(it => it.join(':')).map(it => (distances[it])).filter(it => it || it?.val === 0).map(it => it?.val)
    //     if(ds.length === 0) {
    //         return ' -----'
    //     }
    //     return Math.min(...ds).toString().padStart(6, ' ')
    // })

    // printMatrix(path)

    
    matrixForEach(matrix, (pos, val) => {
        const [x,y] = pos;
        
        if(matrix[y][x] == '#') return

        const k = pos.join(':')

        const kN = k+':N'
        const kW = k+':W'
        const kS = k+':S'
        const kE = k+':E'

        const up =      [x,     y - 1,  'N'].join(':')
        const down =    [x,     y + 1,  'S'].join(':')
        const left =    [x - 1, y,      'W'].join(':')
        const right =   [x + 1, y,      'E'].join(':')

        vertices.push(kN, kW, kS, kE)

        edges[kN] = (edges[kN] ?? {})
        edges[kW] = (edges[kW] ?? {})
        edges[kE] = (edges[kE] ?? {})
        edges[kS] = (edges[kS] ?? {})
        
        if(matrix[y-1][x] !== '#')
            edges[kN][up] = 1
        
        if(matrix[y][x-1] !== '#')
            edges[kW][left] = 1
        
        if(matrix[y][x+1] !== '#')
            edges[kE][right] = 1
        
        if(matrix[y+1][x] !== '#')
            edges[kS][down] = 1

        ;([[kN, kE, 1000], [kN, kS, 2000], [kN, kW, 1000], [kE, kS, 1000], [kE, kW, 2000], [kS, kW, 1000]] as [string, string, number][]) .forEach(([a, b, w]) => {
            edges[a] = (edges[a] ?? {})
            edges[b] = (edges[b] ?? {})
            edges[a][b] = w
            edges[b][a] = w
        });
    })

    vertices.forEach(it => {
        distances[it] = {val: Infinity, prevNodes: []}
    });

    const start = findPos(matrix, 'S')
    const end = findPos(matrix, 'E') 

    const startK = start[0] + ':' + start[1] + ':' + 'E'
    distances[startK] = {val: 0, prevNodes: [startK]}
    const visited = new Set();
    let unvisited = [];


    function iter(node: string) {
        if(visited.has(node)) {
            return;
        }
        visited.add(node);

        const a: Record<string, number> = edges[node];
        
        if(!a) return;

        Object.entries(a).forEach(([k, v]) => {
            if(distances[node].val + v < distances[k].val) {
                distances[k].val = distances[node].val + v
                distances[k].prevNodes = [node]
                unvisited.push(k)
            } else if(distances[node].val + v === distances[k].val) {
                distances[k].val = distances[node].val + v
                distances[k].prevNodes.push(node)
                unvisited.push(k) 
            }
        })
    }

    unvisited.push(startK)

    while(unvisited.length !== 0) {
        let min = Infinity;
        let minIdx = -1;

        unvisited.forEach((it, idx) => {
            if(it !== null && distances[it].val < min) {
                min = distances[it].val
                minIdx = idx
            }
        })

        if(minIdx !== -1) {
            const k = unvisited[minIdx];
            unvisited.splice(minIdx, 1)
            iter(k)
        } else {
            break
        }

    }

    // matrixMap(path, ([x,y]) => {
    //     const ds = [
    //         [x,y,'N'],
    //         [x,y,'E'],
    //         [x,y,'W'],
    //         [x,y,'S']
    //     ].map(it => it.join(':')).map(it => (distances[it])).filter(it => it || it?.val === 0).map(it => it?.val)
    //     if(ds.length === 0) {
    //         return ' -----'
    //     }
    //     return Math.min(...ds).toString().padStart(6, ' ')
    // })

    // printMatrix(path)

    const k = end.join(':')

    function findPath(node: string) {
        if(node === startK) {
            return [node]
        }

        return distances[node].prevNodes.map(it => [node].concat(...findPath(it)))
    }

    const kN = k+':N'
    const kW = k+':W'
    const kS = k+':S'
    const kE = k+':E'


    function uniqValues(arr) {
        return [...new Set(arr)]
    }

    return uniqValues(findPath(kN)[0].map(it => it.slice(0, -2))).length
}