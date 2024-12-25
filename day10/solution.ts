export function solution1(input: string) {
    const m = input.split('\n').map(it => it.split('').map(Number))

    function findTrails(x, y, elevation = 0) {
        let res = [];

        if(elevation === 9 && m[y][x] === 9) {
            return [`${x}:${y}`]
        } 
        [[-1,0], [1,0], [0, -1], [0, 1]].forEach(([a,b]) => {
                const x1 = x + a
                const y1 = y + b
                if(x1 < 0 || x1 >= m.at(0).length) return
                if(y1 < 0 || y1 >= m.length) return
                if(x1 === x && y1 === y) return
                if(m[y1][x1] === elevation + 1) {
                    res.push(...findTrails(x1, y1, elevation + 1))
                }
            })

        return res
    }

    let totalRes = 0;

    m.forEach((row, y) => row.forEach((it, x) => {
        if(it === 0) {
            const t = findTrails(x, y)
            const s = new Set(t)
            totalRes += s.size
        }
    }))

    return totalRes
} 

export function solution2(input: string) {
    const m = input.split('\n').map(it => it.split('').map(Number))
    let totalRes = 0;

    function findTrails(x, y, elevation = 0) {
        if(elevation === 9 && m[y][x] === 9) {
            totalRes++
        } 
        [[-1,0], [1,0], [0, -1], [0, 1]].forEach(([a,b]) => {
                const x1 = x + a
                const y1 = y + b
                if(x1 < 0 || x1 >= m.at(0).length) return
                if(y1 < 0 || y1 >= m.length) return
                if(x1 === x && y1 === y) return
                if(m[y1][x1] === elevation + 1) {
                    findTrails(x1, y1, elevation + 1)
                }
            })

    }

    m.forEach((row, y) => row.forEach((it, x) => {
        if(it === 0) {
            const t = findTrails(x, y)
        }
    }))

    return totalRes
}