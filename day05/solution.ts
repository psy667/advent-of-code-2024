function parse(data: string) {
    const [rulesRaw, pagesRaw] = data.split('\n\n')

    return {
        rules: rulesRaw.split('\n').map(it => it.split('|').map(Number)),
        pages: pagesRaw.split('\n').map(it => it.split(',').map(Number))
    }
}

export function solution1(input: string) {
    const {rules, pages} = parse(input);

    const rulesMap = {};

    rules.forEach(([k, v]) => {
        rulesMap[k] = (rulesMap[k] ?? new Set()).add(v)
    })

    return pages
        .filter(page => {
            for(let i = 1; i < page.length; i++) {
                const t = rulesMap[page[i - 1]]?.has(page[i])
            
                if(!t) {
                    return false
                }

            }
            return true
        })
        .map(it => it[Math.floor(it.length / 2)])
        .reduce((a,c) => a + c, 0)
}

export function solution2(input: string) {
    const {rules, pages} = parse(input);

    const rulesMap = {};

    rules.forEach(([k, v]) => {
        rulesMap[k] = (rulesMap[k] ?? new Set()).add(v)
    })

    return pages
    .filter(page => {
        for(let i = 1; i < page.length; i++) {
            const t = rulesMap[page[i - 1]]?.has(page[i])
        
            if(!t) {
                return true
            }

        }
        return false 
    })
    .map(it => 
        it.sort((a,b) => {
            if(rulesMap[a]?.has(b)) {
                return -1
            } else {
                return 1
            }
        })
    )
    .map(it => it[Math.floor(it.length / 2)])
    .reduce((a,c) => a + c, 0)
}