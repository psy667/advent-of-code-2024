export function parse(input: string) {
    return input.split('\n\n').map(it => {
        return it.split('\n').map(it => it.split(''))
    })
}

export function solution1(input: string) {
    const data = parse(input).map(it => {
        const isKey = it[0][0] === '.';
        let res = new Array(it[0].length).fill(0)

        for(let x = 0; x < it[0].length; x++) {
            for(let y = 1; y < it.length - 1; y++) {
                if(it[y][x] === '#') {
                    res[x]++
                }
            }
        }

        return [isKey ? 'key' : 'lock', res]
    });

    const locks = data.filter(it => it[0] === 'lock').map(it => it[1])
    const keys = data.filter(it => it[0] === 'key').map(it => it[1])

    const isOverlap = (lock, key) => {
        for(let i = 0; i < lock.length; i++) {
            if(lock[i] + key[i] > 5) {
                return true
            }
        }
        return false
    }

    let res = 0;

    for(let a = 0; a < locks.length; a++) {
        for(let b = 0; b < keys.length; b++) {
            if(!isOverlap(locks[a], keys[b])) {
                res++
            }
        }
    }

    return res
}

export function solution2(input: string) {

}