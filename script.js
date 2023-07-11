const cells = document.querySelectorAll('[data-cell]')
const container = document.querySelector('.container')
const resetButton = document.querySelector('button')

const highlight_CLASS = 'highlight'
const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
]

const circle_CLASS = 'circle'
const x_CLASS = 'x'
let xTurn = Math.random() > 0.5     // generate Booleans


cells.forEach(cell => {
    cell.addEventListener('click', markCell,{once: true})
})

function markCell() {
    if(xTurn) {
        this.classList.add(x_CLASS)
        checkWinningCells(x_CLASS)

    }else {
        this.classList.add(circle_CLASS)
        checkWinningCells(circle_CLASS)
        
    }
    addHoveringClassOnContainer()
    
    xTurn = !xTurn      //  switch turn
}

function checkCombinations(currentClass) {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
} 

function checkWinningCells(currentClass) {
    const hasAWinner = checkCombinations(currentClass)
    const message = hasAWinner ? `Winner is ${currentClass}` : 'Draw!'            

    if(hasAWinner || isDraw()) {
        if(hasAWinner) highlightWinner(currentClass);
                                
        onScreenMessage(message)
    } 
}

resetButton.addEventListener('click', function() {
    removeOnScreenMessage()
    cleanCells()
    cells.forEach(cell => {
        cell.addEventListener('click', markCell, {once: true})
    })
})

function removeOnScreenMessage() {
    document.querySelector('.message-container').style.display = ''
}

function cleanCells() {
    cells.forEach(cell => {
        cell.classList.remove(x_CLASS, circle_CLASS, highlight_CLASS)
    })
}

function isDraw() {
    return [...cells].every(cell => {
       return cell.classList.contains(x_CLASS) || cell.classList.contains(circle_CLASS)
    })
}

function addHoveringClassOnContainer(){
    if(xTurn) {
        container.classList.add(circle_CLASS)
        container.classList.remove(x_CLASS)
    }else {
        container.classList.add(x_CLASS)
        container.classList.remove(circle_CLASS)
    }
}

function highlightWinner(currentClass) {
    const combinations = WINNING_COMBINATION.find(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
    combinations.forEach(index => {
        cells[index].classList.add(highlight_CLASS)
    })
}

function onScreenMessage(message) {
    setTimeout(()=>{
        document.querySelector('.message').innerText = message
        document.querySelector('.message-container').style.display = 'grid'
    }, 600)
    cells.forEach(cell => {
         cell.removeEventListener('click', markCell)
    })
}

// thanks
