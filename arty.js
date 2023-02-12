
function getCubes(ratio, numb, columnSizeFloat, rowSizeFloat, height, width ){
    let firstNumberOfRows = Math.ceil(rowSizeFloat);
    let firstNumberOfColumns  = Math.ceil(numb / firstNumberOfRows);
    
    while (firstNumberOfRows * ratio < firstNumberOfColumns) {
        firstNumberOfRows++;
        firstNumberOfColumns = Math.ceil(numb / firstNumberOfRows);
    }

    let firstCellSize = height / firstNumberOfRows;

    let secondNumberOfColumns = Math.ceil(columnSizeFloat);
    let secondNumberOfRows = Math.ceil(numb / secondNumberOfColumns);

    while (secondNumberOfColumns < secondNumberOfRows * ratio) {
        secondNumberOfColumns++;
        secondNumberOfRows = Math.ceil(numb / secondNumberOfColumns);
    }

    let secondCellSize = width / secondNumberOfColumns;

    let rows, columns, cellSize;
    if (firstCellSize < secondCellSize) {
        rows = secondNumberOfRows;
        columns = secondNumberOfColumns;
        cellSize = secondCellSize;
    } else {
        rows = firstNumberOfRows;
        columns = firstNumberOfColumns;
        cellSize = firstCellSize;
    }
    return {
        columns,
        rows,
        cellSize
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function generateDivs() {
    const n = 500
    const container = document.getElementById('container')
    const { width, height } = container.getBoundingClientRect()
    const ratio = width / height
    const ncols_float = Math.sqrt(n * ratio)
    const nrows_float = n / ncols_float;

    const { columns, rows, cellSize } = getCubes(ratio, n, ncols_float, nrows_float, height, width)
    const maxNumberOfCubes = columns * rows
    const box = document.getElementById('box')
    box.style.width = columns * cellSize
    box.style.height = rows * cellSize
    
    const randoms = [getRandomInt(maxNumberOfCubes), getRandomInt(maxNumberOfCubes), getRandomInt(maxNumberOfCubes), getRandomInt(maxNumberOfCubes)]
    let count = 0
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < columns; j++){
            const outerCube = document.createElement("div")
            const mycube = document.createElement("div")
            outerCube.classList.add("outerCube")
            outerCube.style.width = `${cellSize}px`
            outerCube.style.height = `${cellSize}px`
            mycube.style.width = `${cellSize}px`
            mycube.style.height = `${cellSize}px`
            randoms.includes(count) ? mycube.classList.add("random") : mycube.classList.add("mycube")
            outerCube.appendChild(mycube)
            box.appendChild(outerCube)
            count++
        }
    }
}

document.body.onload = generateDivs();