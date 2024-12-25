import { check1 } from '../utils/checks';
import { padStart } from '../utils/index';
type Coord = [number, number]


export function checkBoundaries1(size, val) {
    return val >= 0 && val < size
}

export function checkBoundaries2(size: [number, number], val: [number, number]) {
    return checkBoundaries1(size[0], val[0]) && checkBoundaries1(size[1], val[1]) 
}


export function solution1(input: string) {
    const matrix = input.split('\n').map(it => it.split(''));
    const frame = [matrix.at(0).length, matrix.length] as Coord
    const fencesMap = new Array(frame[1]).fill(0).map(it => new Array(frame[0]).fill(' '))
    const visited = new Set();

    function setFences(type: string, coord) {
        const [x,y] = coord;
        let fences = 0;

        if(matrix[y]?.[x - 1] !== type) {
            fences++
        }

        if(matrix[y]?.[x + 1] !== type) {
            fences++
        }


        if(matrix[y - 1]?.[x] !== type) {
            fences++
        }


        if(matrix[y + 1]?.[x] !== type) {
            fences++
        }

        fencesMap[y][x] = fences
    }

    function traverseRegion(type: string, coord: Coord): {area: number, fences: number} {
        if(!checkBoundaries2(frame, coord)) return {area: 0, fences: 0}
        const [x,y] = coord;
        
        if(matrix[y][x] !== type) return {area: 0, fences: 0}

        const k = coord.join(':')
        if(visited.has(k)) return {area: 0, fences: 0}

        let area = 1;
        let fences = fencesMap[y][x];

        visited.add(k)

        const r1 = traverseRegion(type, [x- 1, y])
        const r2 = traverseRegion(type, [x + 1, y])
        const r3 = traverseRegion(type, [x, y - 1])
        const r4 = traverseRegion(type, [x, y + 1]);

       [r1, r2, r3, r4].forEach(it => {
        area += it.area
        fences += it.fences
       }); 
        

        return {area, fences};
    }

    for(let y = 0; y < frame[1]; y++) {
        for(let x = 0; x < frame[0]; x++) {
            setFences(matrix[y][x], [x, y])
        }
    }

    let regions = []

    for(let y = 0; y < frame[1]; y++) {
        for(let x = 0; x < frame[0]; x++) {
            const t = traverseRegion(matrix[y][x], [x, y])
            if(t.area !== 0) {
                regions.push(t)
            }
        }
    }


    // console.log(fencesMap.map(it => it.join('')).join('\n'))
    // console.log('')
    // console.log(matrix.map(it => it.join('')).join('\n'))

    return regions.map(it => it.area * it.fences).reduce((a,c) => a+c, 0)
}

export function solution2(input: string) {
    const matrix = input.split('\n').map(it => it.split(''));
    const frame = [matrix.at(0).length, matrix.length] as Coord
    const fencesMap = new Array(frame[1]).fill(0).map(it => new Array(frame[0]).fill(' '))
    const visited = new Set();

    function setFences(type: string, coord) {
        const [x,y] = coord;
        let fences = 0;

        if(matrix[y]?.[x - 1] !== type) {
            fences++
        }

        if(matrix[y]?.[x + 1] !== type) {
            fences++
        }


        if(matrix[y - 1]?.[x] !== type) {
            fences++
        }


        if(matrix[y + 1]?.[x] !== type) {
            fences++
        }

        fencesMap[y][x] = fences
    }

    function traverseRegion(type: string, coord: Coord): Coord[] {
        if(!checkBoundaries2(frame, coord)) return []
        const [x,y] = coord;
        
        if(matrix[y][x] !== type) return []

        const k = coord.join(':')
        if(visited.has(k)) return []

        visited.add(k)

        const r1 = traverseRegion(type, [x - 1, y])
        const r2 = traverseRegion(type, [x + 1, y])
        const r3 = traverseRegion(type, [x, y - 1])
        const r4 = traverseRegion(type, [x, y + 1]);
        
        return [coord].concat(r1).concat(r2).concat(r3).concat(r4)
    }

    const lines = new Array(frame[1]).fill(0).map(it => new Array(frame[0]).fill(0).map(it => ({top:0, bottom:0, left:0, right:0})))

    let lineId = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    for(let y = 0; y < frame[1]; y++) {
        for(let x = 0; x < frame[0]; x++) {
            const c = matrix[y]?.[x];

            const t = matrix[y-1]?.[x];
            const b = matrix[y+1]?.[x];
            const l = matrix[y]?.[x-1];
            const r = matrix[y]?.[x+1];

     
            if(l !== c || lines[y]?.[x-1].top !== lineId.top) {
                lineId.top++
            }
            if(t !== c) {
                lines[y][x].top = lineId.top
            }

            if(l !== c || lines[y]?.[x-1].bottom !== lineId.bottom) {
                lineId.bottom++
            }
            if(b !== c) {
                lines[y][x].bottom = lineId.bottom
            }
        }
    }

    for(let x = 0; x < frame[0]; x++) {
        for(let y = 0; y < frame[1]; y++) {
            if(matrix[y-1]?.[x] !== matrix[y]?.[x] || lines[y-1]?.[x].left !== lineId.left) {
                lineId.left++
            }
            if(matrix[y]?.[x-1] !== matrix[y]?.[x]) {
                lines[y][x].left = lineId.left 
            }

            if(matrix[y-1]?.[x] !== matrix[y]?.[x] || lines[y-1]?.[x].right !== lineId.right) {
                lineId.right++
            }
            if(matrix[y]?.[x+1] !== matrix[y]?.[x]) {
                lines[y][x].right = lineId.right 
            }
        }
    }

    const regions = [];

    for(let y = 0; y < frame[1]; y++) {
        for(let x = 0; x < frame[0]; x++) {
            const t = traverseRegion(matrix[y][x], [x, y])
            if(t.length!==0){
                const top = new Set([0]);
                const left = new Set([0]);
                const right = new Set([0]);
                const bottom = new Set([0]);


                t.forEach(([x,y]) => {
                    top.add(lines[y][x].top)
                    left.add(lines[y][x].left)
                    right.add(lines[y][x].right)
                    bottom.add(lines[y][x].bottom) 
                })

                const fences = top.size + left.size + right.size + bottom.size - 4

                regions.push(
                    {
                        type: matrix[y][x],
                        area: t.length,
                        fences,
                        // top,
                        // left,
                        // right,
                        // bottom
                    }
                )
            }
        }
    }

    // ;['top', 'left', 'right', 'bottom'].forEach(d => {
    //     console.log(d)
    //     console.log(lines.map(it =>it.map(it =>  it[d].toString()).join('\t')).join('\n'))
    // })
    // console.log('')
    // console.log(matrix.map(it => it.join('')).join('\n'))

    return regions.map(it => it.area * it.fences).reduce((a,c) => a+c, 0)
}