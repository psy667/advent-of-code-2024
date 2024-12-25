
export function solution1(input: string) {
    const matrix = input.split('\n').map(it => it.split(''));
    let direction = [-1,0]
    // [0, 1]
    // [1, 0]
    // [0, -1]

    function turnRight() {
        direction = [direction[1], direction[0] * -1]
    }

    function step() {
        const curPosY = matrix.findIndex(it => it.includes('^'))
        if(curPosY === -1) {
            return;
        }
        const curPosX = matrix[curPosY].indexOf('^')

        const [newPosY, newPosX] = [curPosY + direction[0], curPosX + direction[1]]

        if((newPosY >= matrix.length) || (newPosX >= matrix.at(0).length) || newPosY < 0 || newPosX < 0) {
            return;
        }

        if(matrix[newPosY][newPosX] === '#') {
            turnRight()
        } else {
            matrix[curPosY][curPosX] = 'X'
            matrix[newPosY][newPosX] = '^'
        }

        step()
    }

    step()

    // console.log(matrix.map(it => it.join('')).join('\n'))

    return matrix.reduce((a,c) => a + c.reduce((a2,c2) => c2 === 'X' ? a2 + 1 : a2, 0), 0) + 1
}


export function solution2(input: string) {
    const matrix = input.split('\n').map(it => it.split(''));
    let direction = [-1,0]
    // [0, 1]
    // [1, 0]
    // [0, -1]

    function turnRight() {
        direction = [direction[1], direction[0] * -1]
    }

    function step(c, curPos) {
        if(c > 1e4) {
            return Infinity
        }

        const [curPosY, curPosX] = curPos

        const [newPosY, newPosX] = [curPosY + direction[0], curPosX + direction[1]]

        if((newPosY >= matrix.length) || (newPosX >= matrix.at(0).length) || newPosY < 0 || newPosX < 0) {
            return c;
        }

        if(matrix[newPosY][newPosX] === '#') {
            turnRight()
            return step(c + 1, curPos) 
        } else {
            return step(c + 1, [newPosY, newPosX])
        }
    }

    const curPosY = matrix.findIndex(it => it.includes('^'))
    const curPosX = matrix[curPosY].indexOf('^')
    matrix[curPosY][curPosX] = '.'
    
    let loops = 0;

    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix.length; x++) {
            if(matrix[y][x] === '#' || (y === curPosY && x === curPosX)) {
                continue
            }
            matrix[y][x] = '#'
            direction = [-1,0]
            const t = step(0, [curPosY, curPosX])
            if(t === Infinity) {
                loops++
            }
            matrix[y][x] = '.'
        }
    }

    return loops;
}

