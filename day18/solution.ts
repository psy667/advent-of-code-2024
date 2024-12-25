import { checkBoundaries2, createMatrix, getFrame, PriorityQueue, type Frame, type Matrix, type Pos } from "../utils/aoc";

export function parse(input: string, n: number): [Matrix<string>, Frame] {
    const [frameR, coords] = input
        .split('\n\n')
        .map(it => it
            .split('\n')
            .map(it => it
                .split(',')
                .map(Number) as Pos
            )
        )

    const frame: Frame = frameR[0]

    const matrix = createMatrix(frame, '.');

    coords.slice(0, n).forEach(([x, y]) => {
        matrix[y][x] = '#'
    })

    return [matrix, frame]
}

function parse2(input: string): [Pos[], Pos] {
    const [frameR, coords] = input
        .split('\n\n')
        .map(it => it
            .split('\n')
            .map(it => it
                .split(',')
                .map(Number) as Pos
            )
        ) 

    return [coords, frameR[0]]
}

function aStar(matrix: Matrix<string>, startPos: Pos, endPos: Pos) {
    const frame: Frame = getFrame(matrix);

    type Node = {
        pos: Pos,
        fScore: number,
    }

    const pq = new PriorityQueue<Node>((a, b) => a.fScore - b.fScore);

    const nodes = new Map<string, Node>();

    const cameFrom = new Map<Node, Node>();
    const gScore = new Map<Node, number>();


    const start = {
        pos: startPos,
        fScore: distance(startPos, endPos),
    }

    nodes.set(start.pos.join(':'), start)
    gScore.set(start, 0);
    pq.enqueue(start, start.fScore)

    function distance(a: Pos, b: Pos) {
        return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
    }

    function reconstructPath(current: Node): Node[] {
        const path: Node[] = [current];
        while (cameFrom.has(current)) {
            current = cameFrom.get(current)!;
            path.unshift(current);
        }
        return path;
    }

    while (!pq.isEmpty()) {
        const cur = pq.dequeue()

        if (cur.pos[0] === endPos[0] && cur.pos[1] === endPos[1]) {
            return reconstructPath(cur)
        }

        ;[[-1, 0], [1, 0], [0, -1], [0, 1]]
            .map(it => [cur.pos[0] + it[0], cur.pos[1] + it[1]])
            .filter(it => checkBoundaries2(frame, it as Pos))
            .filter(it => matrix[it[1]][it[0]] !== '#')
            .map(pos => {
                const key = pos.join(':')
                if (!nodes.has(key)) {
                    nodes.set(key, {
                        fScore: 0,
                        pos: pos as Pos
                    })
                }
                return nodes.get(key)
            })
            .forEach((neighbor) => {
                const gScoreVal = gScore.get(cur) + 1

                if (!gScore.has(neighbor) || gScoreVal < gScore.get(neighbor)) {
                    cameFrom.set(neighbor, cur)
                    gScore.set(neighbor, gScoreVal)
                    neighbor.fScore = gScoreVal + distance(neighbor.pos, endPos)
                    pq.enqueue(neighbor, neighbor.fScore)
                }
            })
    }
    return []
}

export function solution1(input: string) {
    const [matrix, frame] = parse(input, 1024);

    const startPos: Pos = [0, 0];
    const endPos: Pos = [frame[0] - 1, frame[1] - 1];

    const path = aStar(matrix, startPos, endPos);

    // path.forEach(it => {
    //     const [x,y] = it.pos;

    //     matrix[y][x] = Bun.color('green', 'ansi') + 'o' + Bun.color('black', 'ansi') 
    // })

    // printMatrix(matrix)

    return path.length - 1
}

export function solution2(input: string) {
    const [coords, frame] = parse2(input)
    const startPos: Pos = [0, 0];
    const endPos: Pos = [frame[0] - 1, frame[1] - 1];


    let l = 0;
    let r = coords.length;
    let t = 0;

    while(l < r - 1) {
        const matrix = createMatrix(frame, '.');
        t = l + Math.floor((r - l) / 2);
        
        for(let i = 0; i < t; i++) {
            const [x,y] = coords[i];
            matrix[y][x] = '#'
        }

        const path = aStar(matrix, startPos, endPos)

        if(path.length === 0) {
            r = t;
        } else {
            l = t;
        }

    }

    return coords[l].join(',');
}