import { checkBoundaries2, printMatrix } from "../utils/aoc";

enum Cell {
    Wall = '#',
    Box = 'O',
    Empty = '.',
    Robot = '@',
}
type Matrix = Cell[][]

type Pos = [number, number]
enum Dir {
    Up = '^',
    Right = '>',
    Down = 'v',
    Left = '<'
}

export function parse(input: string): [Matrix, Dir[]] {
    const [t1, t2] = input.split('\n\n')
    const moves = t2.split('\n').flatMap(it => it.split('')).map(it => {
        return ({
            '>': Dir.Right,
            'v': Dir.Down,
            '<': Dir.Left,
            '^': Dir.Up
        })[it]
    });

    const matrix = t1.split('\n').map(it => it.split('').map(it => {
        return ({
            '.': Cell.Empty,
            '#': Cell.Wall,
            'O': Cell.Box,
            '@': Cell.Robot,
        })[it]
    }))

    return [matrix, moves]
}


export function solution1(input: string) {
    const [matrix, moves] = parse(input)
    const frame = [matrix.at(0).length, matrix.length]

    function getRobotPos(): Pos {
        const robotY = matrix.findIndex(it => it.includes(Cell.Robot))
        const robotX = matrix[robotY].indexOf(Cell.Robot)
        return [robotX, robotY]
    }

    const pos = getRobotPos()
    matrix[pos[1]][pos[0]] = Cell.Empty;

    function swap(pos1: Pos, pos2: Pos) {
        const t = matrix[pos1[1]][pos1[0]]
        matrix[pos1[1]][pos1[0]] = matrix[pos2[1]][pos2[0]]
        matrix[pos2[1]][pos2[0]] = t
    }
    function moveRobot(dir: Dir) {
        let [x, y] = [pos[0], pos[1]]

        if (dir === Dir.Down) {
            y++
            if (matrix[y][x] === Cell.Empty) {
                pos[1]++
            } else {
                while (y < frame[1]) {
                    if (matrix[y][x] === Cell.Empty) {
                        swap([pos[0], pos[1] + 1], [x, y])
                        pos[1]++
                        return
                    }
                    if (matrix[y][x] === Cell.Wall) {
                        return;
                    }
                    y++
                }
            }
            return;
        }

        if (dir === Dir.Right) {
            x++
            if (matrix[y][x] === Cell.Empty) {
                pos[0]++
            } else {
                while (x < frame[0]) {
                    if (matrix[y][x] === Cell.Empty) {
                        swap([pos[0] + 1, pos[1]], [x, y])
                        pos[0]++
                        return;
                    }
                    if (matrix[y][x] === Cell.Wall) {
                        return;
                    }
                    x++
                }
            }
            return;
        }

        if (dir === Dir.Up) {
            y--
            if (matrix[y][x] === Cell.Empty) {
                pos[1]--
            } else {
                while (y >= 0) {
                    if (matrix[y][x] === Cell.Empty) {
                        swap([pos[0], pos[1] - 1], [x, y])
                        pos[1]--
                        return
                    }
                    if (matrix[y][x] === Cell.Wall) {
                        return;
                    }
                    y--
                }
            }
            return;
        }

        if (dir === Dir.Left) {
            x--
            if (matrix[y][x] === Cell.Empty) {
                pos[0]--
            } else {
                while (x >= 0) {
                    if (matrix[y][x] === Cell.Empty) {
                        swap([pos[0] - 1, pos[1]], [x, y])
                        pos[0]--
                        return;
                    }
                    if (matrix[y][x] === Cell.Wall) {
                        return;
                    }
                    x--
                }
            }
            return;
        }
    }

    function getGPS(pos: Pos) {
        return pos[1] * 100 + pos[0]
    }


    moves.forEach(it => {
        moveRobot(it)
    })


    let res = 0;
    for (let y = 0; y < frame[1]; y++) {
        for (let x = 0; x < frame[0]; x++) {
            const val = matrix[y][x]
            if (val === Cell.Box) {
                res += getGPS([x, y])
            }
        }
    }
    return res
}

export function parse2(input: string): [string[][], Dir[]] {
    const [t1, t2] = input.split('\n\n')
    const moves = t2.split('\n').flatMap(it => it.split('')).map(it => {
        return ({
            '>': Dir.Right,
            'v': Dir.Down,
            '<': Dir.Left,
            '^': Dir.Up
        })[it]
    });

    const matrix = t1.split('\n').map(it => it.split('').flatMap(it => {
        return ({
            '.': ['.', '.'],
            '#': ['#', '#'],
            'O': ['[', ']'],
            '@': ['@', '.'],
        })[it]
    }))

    return [matrix, moves]
}

export function solution2(input: string) {
    const [matrix, moves] = parse2(input)
    const frame = [matrix.at(0).length, matrix.length] as Pos;

    function getRobotPos(): Pos {
        const robotY = matrix.findIndex(it => it.includes(Cell.Robot))
        const robotX = matrix[robotY].indexOf(Cell.Robot)
        return [robotX, robotY]
    }

    const pos = getRobotPos()

    // matrix[pos[1]][pos[0]] = Cell.Empty;

    function swap(pos1: Pos, pos2: Pos) {
        const t = matrix[pos1[1]][pos1[0]]
        matrix[pos1[1]][pos1[0]] = matrix[pos2[1]][pos2[0]]
        matrix[pos2[1]][pos2[0]] = t
    }

    function canMove(pos: Pos, dir: Dir): boolean {
        const [x, y] = pos;
        if (!checkBoundaries2(frame, pos)) {
            return false;
        }
        if (matrix[y][x] === '#') {
            return false
        }
        if (dir === Dir.Left) {
            if (matrix[y][x - 1] === '.') {
                return true
            } else {
                return canMove([x - 1, y], dir)
            }
        }
        if (dir === Dir.Down) {
            if (matrix[y + 1][x] === '.') {
                return true
            } else {
                if (matrix[y + 1][x] === '[') {
                    const t1 = canMove([x, y + 1], dir)
                    const t2 = canMove([x + 1, y + 1], dir)
                    return t1 && t2
                }
                if (matrix[y + 1][x] === ']') {
                    const t1 = canMove([x, y + 1], dir)
                    const t2 = canMove([x - 1, y + 1], dir)
                    return t1 && t2
                }
            }
        }

        if (dir === Dir.Up) {
            if (matrix[y - 1][x] === '.') {
                return true
            } else {
                if (matrix[y - 1][x] === '[') {
                    const t1 = canMove([x, y - 1], dir)
                    const t2 = canMove([x + 1, y - 1], dir)
                    return t1 && t2
                }
                if (matrix[y - 1][x] === ']') {
                    const t1 = canMove([x, y - 1], dir)
                    const t2 = canMove([x - 1, y - 1], dir)
                    return t1 && t2
                }
                return false
            }
        }

        if (dir === Dir.Right) {
            if (matrix[y][x + 1] === '.') {
                return true
            } else {
                return canMove([x + 1, y], dir)
            }
        }

    }

    function move(pos: Pos, dir: Dir): boolean {
        const [x, y] = pos;

        const movable = canMove(pos, dir);

        if (!movable) {
            return false
        }

        if (dir === Dir.Left) {
            if (matrix[y][x - 1] === '.') {
                matrix[y][x - 1] = matrix[y][x]
                matrix[y][x] = '.'
            } else {
                move([x - 1, y], dir)
                matrix[y][x - 1] = matrix[y][x]
                matrix[y][x] = '.'
            }
        }
        if (dir === Dir.Right) {
            if (matrix[y][x + 1] === '.') {
                matrix[y][x + 1] = matrix[y][x]
                matrix[y][x] = '.'
            } else if (move([x + 1, y], dir)) {
                matrix[y][x + 1] = matrix[y][x]
                matrix[y][x] = '.'
            }
        }

        if (dir === Dir.Up) {
            if (matrix[y - 1][x] === '.') {
                matrix[y - 1][x] = matrix[y][x]
                matrix[y][x] = '.'
                return true
            } else {
                if (matrix[y - 1][x] === '[') {
                    const t1 = canMove([x, y - 1], dir)
                    const t2 = canMove([x + 1, y - 1], dir)
                    if (t1 && t2) {
                        move([x, y - 1], dir)
                        move([x + 1, y - 1], dir)
                        matrix[y - 1][x] = matrix[y][x]
                        matrix[y][x] = '.'
                    }
                    return true
                } else if (matrix[y - 1][x] === ']') {
                    const t1 = canMove([x, y - 1], dir)
                    const t2 = canMove([x - 1, y - 1], dir)
                    if (t1 && t2) {
                        move([x, y - 1], dir)
                        move([x - 1, y - 1], dir)
                        matrix[y - 1][x] = matrix[y][x]
                        matrix[y][x] = '.'
                    }
                    return true
                }
            }
        }

        if (dir === Dir.Down) {
            if (matrix[y + 1][x] === '.') {
                matrix[y + 1][x] = matrix[y][x]
                matrix[y][x] = '.'
                return true
            } else {
                if (matrix[y + 1][x] === '[') {
                    const t1 = canMove([x, y + 1], dir)
                    const t2 = canMove([x + 1, y + 1], dir)
                    if (t1 && t2) {
                        move([x, y + 1], dir)
                        move([x + 1, y + 1], dir)
                        matrix[y + 1][x] = matrix[y][x]
                        matrix[y][x] = '.'
                    }
                    return true

                } else if (matrix[y + 1][x] === ']') {
                    const t1 = canMove([x, y + 1], dir)
                    const t2 = canMove([x - 1, y + 1], dir)
                    if (t1 && t2) {
                        move([x, y + 1], dir)
                        move([x - 1, y + 1], dir)
                        matrix[y + 1][x] = matrix[y][x]
                        matrix[y][x] = '.'
                    }
                    return true
                }
            }
        }

        return true
    }

    function moveRobot(dir: Dir) {
        let [x, y] = pos;
        const moved = move([x, y], dir)
        if (moved) {
            matrix[y][x] = '.'
        }
        if (dir === Dir.Down && moved) {
            pos[1]++
        }

        if (dir === Dir.Right && moved) {
            pos[0]++
        }

        if (dir === Dir.Up && moved) {
            pos[1]--
        }

        if (dir === Dir.Left && moved) {
            pos[0]--
        }
    }

    function getGPS(pos: Pos) {
        return pos[1] * 100 + pos[0]
    }

    if (Bun.argv.includes('-i')) {
        console.clear()
        process.stdin.setRawMode(true)
        process.stdin.on('data', (data) => {
            if (data[0] === 3) {
                process.exit(0)
            }
            console.log(String.fromCharCode(data[0]))
            const mp = {
                'w': '^',
                'a': '<',
                's': 'v',
                'd': '>'
            }
            const d = mp[String.fromCharCode(data[0])]
            if (d) {
                moveRobot(d)
            }
            console.clear()
            const mapping = {
                [Cell.Wall]: Bun.color('blue', 'ansi') + `#`,
                [Cell.Empty]: Bun.color('black', 'ansi') + ' ',
                [Cell.Robot]: Bun.color('red', 'ansi') + '+',
                '[': Bun.color('green', 'ansi') + '[',
                ']': Bun.color('green', 'ansi') + ']'
            }

            let m = [];

            for (let y = 0; y < frame[1]; y++) {
                m[y] = [];
                for (let x = 0; x < frame[0]; x++) {
                    m[y][x] = mapping[matrix[y][x]]
                }
            }

            printMatrix(m)

            let res = 0;
            for (let y = 0; y < frame[1]; y++) {
                for (let x = 0; x < frame[0]; x++) {
                    const val = matrix[y][x]
                    if (val === '[') {
                        res += getGPS([x, y])
                    }
                }
            }
            console.log(res)

        })
    } else {
        moves.forEach((it: Dir) => {
            moveRobot(it)

            if(Bun.argv.includes('-v')) {
                const mapping = {
                    [Cell.Wall]: Bun.color('blue', 'ansi') + `#`,
                    [Cell.Empty]: Bun.color('black', 'ansi') + ' ',
                    [Cell.Robot]: Bun.color('red', 'ansi') + '+',
                    '[': Bun.color('green', 'ansi') + '[',
                    ']': Bun.color('green', 'ansi') + ']'
                }

                let m = [];

                for (let y = 0; y < frame[1]; y++) {
                    m[y] = [];
                    for (let x = 0; x < frame[0]; x++) {
                        m[y][x] = mapping[matrix[y][x]]
                    }
                }
                console.clear()
                printMatrix(m)
                Bun.sleepSync(100)
            }
            
        })

        let res = 0;
        for (let y = 0; y < frame[1]; y++) {
            for (let x = 0; x < frame[0]; x++) {
                const val = matrix[y][x]
                if (val === '[') {
                    res += getGPS([x, y])
                }
            }
        }
        return res
    }
}