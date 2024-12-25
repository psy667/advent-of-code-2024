enum OpCode {
    adv = 0,
    bxl = 1,
    bst = 2,
    jnz = 3,
    bxc = 4,
    out = 5,
    bdv = 6,
    cdv = 7,
}

export function parse(input: string): {program: number[], registers: {A: number, B: number, C: number}} {
    const [t1, t2] = input.split('\n\n');
    const registers = Object.fromEntries(t1.split('\n').map(it => it.split(' ')).map(([_, reg, val]) => [reg.slice(0,1), Number(val)])) as {A: number, B: number, C: number}
    const program = t2.split(' ').at(1).split(',').map(Number)
    return {registers, program}
}

function run(program, registers) {
    const output = [];

    let pointer = 0;

    function comboOperand(val: bigint): bigint {
        switch(val) {
            case 1n:
            case 2n:
            case 3n:
                return val
            case 4n:
                return registers.A
            case 5n:
                return registers.B
            case 6n:
                return registers.C
            default:
                return val
        }
    }

    while(pointer < program.length) {
        const operator = program[pointer]
        const operand = BigInt(program[pointer+1])
        const combo = comboOperand(operand)

        switch(operator) {
            case OpCode.adv: {
                registers.A = registers.A / 2n ** combo
                break;
            }
            case OpCode.bxl: {
                registers.B = registers.B ^ operand
                break;
            }
            case OpCode.bst: {
                registers.B = combo % 8n;
                break;
            }
            case OpCode.jnz: {
                if(registers.A !== 0n) {
                    pointer = Number(operand)
                    pointer-=2
                } 
                break;
            }
            case OpCode.bxc: {
                registers.B = registers.B ^ registers.C
                break;
            }
            case OpCode.out: {
                output.push(Number(combo % 8n))
                break;
            }
            case OpCode.bdv: {
                registers.B = registers.A / 2n ** combo
                break;
            }
            case OpCode.cdv: {
                registers.C = registers.A / 2n ** combo
                break;
            }
        }

        pointer+=2
    }
    
    return output
}

export function solution1(input: string) {
    const {registers, program} = parse(input);
    
    return run(program, {
        A: BigInt(1618936206953966),
        B: BigInt(registers.B),
        C: BigInt(registers.C)
    }).join(',')
}

export function solution2(input: string) {
    const { program } = parse(input);
    const expected = program.join(',')
    let i = 0n
  
    while (true) {
      const result = run(
        program,
        { A: i, B: 0n, C: 0n },
      ).join(',')

      if (result === expected) {
        return Number(i)
      }

      if (expected.endsWith(result)) {
        i <<= 3n
      } else {
        i++
      }
    }
}


