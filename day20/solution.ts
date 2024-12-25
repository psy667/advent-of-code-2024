import { countValues, map, measure, measureSync, pipe, split, splitByLine } from "../utils";
import { createMatrix, findPos, getFrame, matrixForEach, matrixMap, printMatrix, type Matrix } from "../utils/aoc";
import { padStart, toString } from '../utils/index';

export function parse(input: string): Matrix<string> {
    return pipe(
        splitByLine(),
        map(
            split('')
        )
    )(input)
}

class Pos {
    constructor(public x: number, public y: number) {

    }

    get val() {
        return [this.x, this.y]
    }

    plus(b: Pos) {
        return new Pos(this.x + b.x, this.y + b.y)
    }

    toString() {
        return `${this.x}:${this.y}`
    }

    manhattanDistance(b: Pos) {
        return Math.abs(this.x - b.x) + Math.abs(this.y - b.y)
    }

    static fromStr(str: string) {
        const [x, y] = str.split(':').map(Number)
        return new Pos(x, y)
    }

    static fromVal(arr: number[] | [number, number]) {
        return new Pos(arr[0], arr[1])
    }
}

export function sol1(matrix: Matrix<string>, maxDistance: number) {
    const frame = getFrame(matrix)
    const path = createMatrix<number>(frame, 0)

    function getEdges(): [Record<string, Record<string, number>>, string[]] {
        const vertices = []
        const edges = {}

        matrixForEach(matrix, (pos, val) => {
            const [x, y] = pos;

            if (matrix[y][x] == '#') return

            const k = pos.join(':')

            const up = [x, y - 1].join(':')
            const down = [x, y + 1].join(':')
            const left = [x - 1, y].join(':')
            const right = [x + 1, y].join(':')

            vertices.push(k)

            edges[k] = (edges[k] ?? {})

            if (matrix[y - 1][x] !== '#')
                edges[k][up] = 1

            if (matrix[y][x - 1] !== '#')
                edges[k][left] = 1

            if (matrix[y][x + 1] !== '#')
                edges[k][right] = 1

            if (matrix[y + 1][x] !== '#')
                edges[k][down] = 1
        });



        return [edges, vertices];
    }

    const [edges, vertices] = getEdges();


    const start = findPos(matrix, 'S')
    const end = findPos(matrix, 'E')
    const k = end.join(':')

    const startK = start[0] + ':' + start[1]

    function getDistances() {
        const distances = {}

        vertices.forEach(it => {
            distances[it] = Infinity
        });


        distances[startK] = 0

        const visited = new Set();
        let unvisited = [];

        function iter(node: string) {
            if (visited.has(node)) {
                return;
            }
            visited.add(node);

            const a = edges[node];

            if (!a) return;

            Object.entries(a).forEach(([k, v]) => {
                distances[k] = Math.min(distances[node] + v, distances[k])
                unvisited.push(k)
            })
        }

        unvisited.push(startK)

        while (unvisited.length !== 0) {
            let min = Infinity;
            let minIdx = -1;

            unvisited.forEach((it, idx) => {
                if (it !== null && distances[it] < min) {
                    min = distances[it]
                    minIdx = idx
                }
            })

            if (minIdx !== -1) {
                const k = unvisited[minIdx];
                unvisited.splice(minIdx, 1)
                iter(k)
            } else {
                break
            }
        }
        return distances
    }

    const distances = getDistances()
    const distanceWithoutCheating = distances[k]

    function getCheatResult(a: Pos, b: Pos, len: number) {
        const aStr = a.toString();
        const bStr = b.toString();
        const t = edges[aStr][bStr];

        // edges[aStr][bStr] = len

        return distances[bStr] - distances[aStr] - len + 1
    }

    const verticesPos = vertices.map(it => Pos.fromStr(it))

    const possibleCheats = verticesPos.flatMap(a => {
        return verticesPos
        .map(b => [a, b, a.manhattanDistance(b)] as [Pos, Pos, number])
        .filter(([a, b, d]) => {
            return d <= maxDistance
        })
    })

    const cheatsSet = new Set(possibleCheats.map(it => it[1].toString()));

    matrixMap(path, ([x, y]) => {
        const k = new Pos(x,y).toString()
        if(cheatsSet.has(k)) {
            return '##'
        }

        return distances[k] ? '..' : '  '
    })

    // printMatrix(path)
    const res = possibleCheats
        .map(it => {
            return getCheatResult(it[0], it[1], it[2])
        })
        .filter(it => it > 100  && it <= distanceWithoutCheating)

    return res.length
}

export function solution1(input: string) {
    const matrix = parse(input);

    return sol1(matrix, 2)
}

export function solution2(input: string) {
    const matrix = parse(input);

    return sol1(matrix, 20)
}