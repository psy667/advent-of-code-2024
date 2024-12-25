export function solution1(input: string) {
    const d = input.split('').map(Number)
    const m = [];
    let curId = 0;

    for(let i = 0; i < d.length; i++) {
        if(i % 2 === 0) {
            m.push(...new Array(d[i]).fill(curId))
            curId++;
        } else {
            m.push(...new Array(d[i]).fill(null)) 
        }
    }

    let l = 0;
    let r = m.length - 1;

    while(l < r) {
        if(m[l] !== null) {
            l++
        } else {
            if(m[r] === null) {
                r--
            } else {
                const t = m[l]
                m[l] = m[r]
                m[r] = t
                l++
                r--
            }
        }
    }
    
    let res = 0;

    for(let i = 0; i < m.length; i++) {
        res+=(i * m[i])
    }

    return res
}


export function solution2(input: string) {
    const d = input.split('').map(Number)

    const files = [];
    const free = [];


    d.forEach((it,idx) => {
        if(idx % 2 === 0) {
            files.push(it)
        } else {
            free.push(it)
        }
    })

    let m = [];

    files.forEach((it,idx) => {
        m.push(...new Array(it).fill(idx))
        m.push(...new Array(free[idx]).fill(null))
    })

    function findFreeSpace(size) {
        let l = 0;
        let r = 0;

        while(r < m.length && l < m.length) {
            if((r - l) === size) {
                return l
            }

            if(m[l] === null) {
                if(m[r] === null) {
                    r++
                } else {
                    l = r+1
                    r = r+1
                }
            } else {
                l++
                r++
            }
        }

        return -1
    }

    function moveFile(id) {
        const fileIdx = m.indexOf(id); 
        const fileSize = m.lastIndexOf(id) - m.indexOf(id) + 1
        const freeSpaceIdx = findFreeSpace(fileSize);

        if(freeSpaceIdx === -1) {
            return;
        }

        if(freeSpaceIdx >= fileIdx) {
            return;
        }
        m.splice(fileIdx, fileSize, ...new Array(fileSize).fill(null))
        m.splice(freeSpaceIdx, fileSize, ...new Array(fileSize).fill(id))
    }

    files.map((_, idx) => idx).reverse().forEach(it => {
        moveFile(it)
    })

    let res = 0;

    for(let i = 0; i < m.length; i++) {
        res+=(i * (m[i] ?? 0))
    }

    return res 
}