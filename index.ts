import { measure } from './utils/index';

const resetCode = `\x1b[0m`
const color = {
    yellow: val => `\x1b[33m` + val + resetCode,
    green: val => `\x1b[32m` + val + resetCode,
    blue: val => `\x1b[34m` + val + resetCode,
    red: val => `\x1b[31m` + val + resetCode,
}

async function run(path) {
    const t = await Bun.file(`${path}/solution.ts`)

    const isFileExist = await t.exists()
    
    if(!isFileExist) {
        console.error(`${path}/solution.ts is not exists`)
        process.exit(1)
    }
    
    const {solution1, solution2 } = require(`${path}/solution.ts`)
    
    const file = Bun.file(`${path}/data.txt`);
    
    const text = await file.text();
    
    const [answer1, t1] = await measure(() => solution1(text))
    console.log('Part 1')
    console.log(`  Answer: ${color.yellow(answer1)}`)
    console.log(`  Time:   ${t1 < 10 ? color.green(t1) : color.red(t1)} msec`)
    const [answer2, t2] = await measure(() => solution2(text))
    console.log('Part 2')
    console.log(`  Answer: ${color.yellow(answer2)}`)
    console.log(`  Time:   ${t2 < 10 ? color.green(t2) : color.red(t2)} msec`)
}

if(Bun.argv[2] === 'until') {
    for(let i = 1; i <= parseInt(Bun.argv[3]); i++) {
        const day = `day` + i.toString().padStart(2, '0') 
        const path =  `./` + day
        console.log(day)
        await run(path)
        console.log('\n')
    }
} else {
    const path = `./` + Bun.argv[2]

    run(path)
}

