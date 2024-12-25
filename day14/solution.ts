type Pair<T> = [T, T]

export function mod(a: number, b: number): number {
    return ((a % b) + b) % b
}

export function getPos(pos: Pair<number>, vel: Pair<number>, moves: number, size: Pair<number>): Pair<number> {
    return [
        mod(pos[0] + vel[0] * moves, size[0]),
        mod(pos[1] + vel[1] * moves, size[1])
    ]
}

export function parse(input: string) {
    return input
        .split('\n')
        .map(line => line.split(' '))
        .map(([pos, vel]) => [pos.slice(2).split(',').map(Number), vel.slice(2).split(',').map(Number)] as Pair<Pair<number>>)
}

export function solution1(input: string) {
    const size = [101, 103] as Pair<number>
    const mX = Math.floor(size[0] / 2)
    const mY = Math.floor(size[1] / 2)

    return parse(input)
        .map(it => getPos(it[0], it[1], 100, size))
        .reduce((acc,cur) => {
            if(cur[1] < mY) {
                if(cur[0] < mX) {
                    acc[0]++
                }
                if(cur[0] > mX) {
                    acc[1]++
                }
            } else if(cur[1] > mY) {
                if(cur[0] < mX) {
                    acc[2]++
                }
                if(cur[0] > mX) {
                    acc[3]++
                }
            }
            
            return acc;
        }, [0,0,0,0])
        .reduce((a,c) => a*c, 1)
}

export function solution2(input: string) {
    const size = [101, 103] as Pair<number>

    function draw(coords: Pair<number>[]) {
        const matrix = new Array(size[1]).fill(null).map(it => new Array(size[0]).fill(0));

        coords.forEach(it => {
            matrix[it[1]][it[0]]++
        })

        const r = matrix.map(row => row.join('')).join('\n')

        if(r.includes('2')) {
            return false
        }
        console.log(r.replaceAll('0', ' '))

        return true
    }
    
    const data = parse(input);

    for(let i = 0; i < 100000000; i++) {
        const coords = data.map(it => getPos(it[0], it[1], i, size))

        const r = draw(coords)
        if(r) {
            console.log(i)
            return i
        }
    }
}