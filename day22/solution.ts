export function parse(input: string) {
    return input.split('\n').map(it => Number(it))
}

function genNumber(secret: number): number {
    let sec = (secret);

    sec = ((sec * 64) ^ sec) & 16777215;
    sec = ((sec >>> 5) ^ sec) & 16777215;  
    sec = ((sec * 2048) ^ sec) & 16777215;

    return sec
}

export function solution1(input: string) {
    const data = parse(input)

    return data.map(it => {
        let v = it
        for(let i = 0; i < 2000; i++) {
            v = genNumber(v)
        }
        return v
    })
    .reduce((a,c) => a + c) 
}

export function solution2(input: string) {
    const data = parse(input);
    
    const m: Record<string, number> = {};

    data.map(it => {
        let visited = new Set();

        let v = it
        let seq = [];
        let prev = 0;

        for(let i = 0; i < 2000; i++) {
            v = genNumber(v)
            const cur = v % 10
            
            seq[3] = seq[2]
            seq[2] = seq[1]
            seq[1] = seq[0]
            seq[0] = prev - cur

            prev = cur

            const str = seq.join(':')

            if(!visited.has(str)) {
                visited.add(str)
                m[str] = (m[str] ?? 0) + cur
            }
        }
    })

    let max = 0;

    for(let i of Object.values(m)) {
        if(i > max) {
            max = i
        }
    }

    return max
}