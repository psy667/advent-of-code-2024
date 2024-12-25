function drawMatrix<T>(matrix: T[][]) {
    return matrix.map(it => it.join('')).join('\n')
}

export function printMatrix<T>(matrix: T[][]) {
    console.log(drawMatrix(matrix))
}

export function checkBoundaries1(size: number, val: number) {
    return val >= 0 && val < size
}

export function checkBoundaries2(size: [number, number], val: [number, number]) {
    return checkBoundaries1(size[0], val[0]) && checkBoundaries1(size[1], val[1]) 
}
export const tuple = <T extends any[]>(...args: T): T => args
export type Pos = [number, number]
export type Matrix<T> = T[][]
export type Frame = [number, number]

export function getFrame<T>(matrix: Matrix<T>): Frame {
    return [
        matrix.at(0).length,
        matrix.length
    ]
}
export function up(pos: Pos): Pos {
    return [pos[0], pos[1] - 1]
}
export function down(pos: Pos): Pos {
    return [pos[0], pos[1] + 1]
}
export function right(pos: Pos): Pos {
    return [pos[0] + 1, pos[1]]
}
export function left(pos: Pos): Pos {
    return [pos[0] - 1, pos[1]]
}



export function get<T>(matrix: Matrix<T>, pos: Pos) {
    return matrix[pos[1]][pos[0]]
}
export function apply<T>(matrix: Matrix<T>, pos: Pos, fn: (v: T) => T) {
    const [x,y] = pos;
    matrix[y][x] = fn(matrix[y][x])
}

export function createMatrix<T>(frame: Frame, defaultValue: T): Matrix<T> {
    return new Array(frame[1]).fill(0).map(_ => new Array(frame[0]).fill(defaultValue))
}

export function findPos<T>(matrix: Matrix<T>, cell: T): Pos {
    const robotY = matrix.findIndex(it => it.includes(cell));

    if(robotY === -1) {
      return [-1,-1]
    }
    const robotX = matrix[robotY].indexOf(cell)
    if(robotX === -1) {
      return [-1, -1]
    }
    return [robotX, robotY]
}

export function matrixForEach<T>(matrix: Matrix<T>, fn: (pos: Pos, val: T) => void) {
    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix.at(0).length; x++) {
            fn([x,y], matrix[y][x])
        }
    }
}

export function matrixMap<T, K = T>(matrix: Matrix<T | K>, fn: (pos: Pos, val: T | K) => K) {
    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix.at(0).length; x++) {
            matrix[y][x] = fn([x,y], matrix[y][x])
        }
    }
}

export class PriorityQueue<T> {
    private heap: Array<[T, number]> = [];
  
    constructor(private comparator: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0) {}
  
    public enqueue(item: T, priority: number): void {
      this.heap.push([item, priority]);
      this.bubbleUp(this.heap.length - 1);
    }
  
    public dequeue(): T | undefined {
      if (this.isEmpty()) {
        return undefined;
      }
  
      const top = this.heap[0];
      const bottom = this.heap.pop();
  
      if (this.heap.length > 0 && bottom !== undefined) {
        this.heap[0] = bottom;
        this.bubbleDown(0);
      }
  
      return top[0];
    }
  
    public peek(): T | undefined {
      return this.isEmpty() ? undefined : this.heap[0][0];
    }
  
    public isEmpty(): boolean {
      return this.heap.length === 0;
    }
  
    public size(): number {
      return this.heap.length;
    }
  
    private bubbleUp(index: number): void {
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (this.compare(index, parentIndex) < 0) {
          this.swap(index, parentIndex);
          index = parentIndex;
        } else {
          break;
        }
      }
    }
  
    private bubbleDown(index: number): void {
      while (true) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let smallestIndex = index;
  
        if (leftChildIndex < this.heap.length && this.compare(leftChildIndex, smallestIndex) < 0) {
          smallestIndex = leftChildIndex;
        }
  
        if (rightChildIndex < this.heap.length && this.compare(rightChildIndex, smallestIndex) < 0) {
          smallestIndex = rightChildIndex;
        }
  
        if (smallestIndex !== index) {
          this.swap(index, smallestIndex);
          index = smallestIndex;
        } else {
          break;
        }
      }
    }
  
    private compare(i: number, j: number): number {
      return this.heap[i][1] - this.heap[j][1] || this.comparator(this.heap[i][0], this.heap[j][0]);
    }
  
    private swap(i: number, j: number): void {
      [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
  }
  