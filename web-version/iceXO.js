//static variables
const squareNum = 9;
const X = 'X'
const O = 'O'
const defaultBackgroundColor = '-moz-default-background-color'
const defaultColor = '-moz-default-color'
const terminalOptions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let firstPlayer = X
const EMPTY = null
const state = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
]
const  getChildIndex = (node) => {
    return Array.prototype.indexOf.call(node.parentNode.childNodes, node);
}
const  random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/* --------------------------------   Main class   ------------------------------------*/
class IceXO{

    // Returns starting board of the board.
    static #initialState(){
        return [
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]
        ]
    }

    // Returns which player turn is.
    static #player(board) {
        let xCount = 0
        let oCount= 0
        board.forEach(row=>{
            xCount += row.filter(s => s === 'X').length
            oCount += row.filter(s => s === 'O').length
        })
        return xCount === oCount ? 'X' : 'O'
    }

    // Returns legal moves in that board.
    static #actions(board){
       let a = []
        board.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (!cell) a.push([i, j])
            })
        })
        return a
    }

    // Returns board after action `a` taken in board s.
    static #result(board, action){
        const currentPlayer = this.#player(board)
        let newBoard = structuredClone(board)
        if (!newBoard[action[0]][action[1]]){
            newBoard[action[0]][action[1]] = currentPlayer
            return newBoard
        }
        throw Error('This Cell Isn\'t Empty!')
    }

    // Returns the winner of the game, if there is one.
    static #winner(board){
        let boardIndex = 0
        let oIndex = []
        let xIndex = []
        board.forEach(row => {
            row.forEach(cell => {
                if (cell === X) xIndex.push(boardIndex)
                else if (cell === O) oIndex.push(boardIndex)
                boardIndex ++
            })
        })

        for (let terminalOption of terminalOptions){
            if (terminalOption.every( x => xIndex.includes(x))) return X
            else if (terminalOption.every( o => oIndex.includes(o))) return O
        }
        return null
    }

    // Returns True if game is over, False otherwise.
    static #terminal(board){
        if (this.#winner(board)) return true

        for (let row of board) {
            for (let cell of row) {
                if (!cell) return false
            }
        }
        return true
    }

    // Returns 1 if X has won the game, -1 if O has won, 0 otherwise.
    static #utility(board){
        if (this.#winner(board) === X) return 1
        else if (this.#winner(board) === O) return -1
        return 0
    }

    // Returns index of the filled place.
    static #actionToIndex(action){
       return (action[0] + 1) * 3 - (3 - action[1])
    }

    // Returns max value of the opponent choice.
    static #maxValue(board){
        if (this.#terminal(board)) return this.#utility(board)
        let v = Number.NEGATIVE_INFINITY
        for (let action of this.#actions(board)) v = Math.max(v, this.#minValue(this.#result(board, action)))
        return v
    }

    // Returns min value of the opponent choice.
    static #minValue(board){
        if (this.#terminal(board)) return this.#utility(board)
        let v = Number.POSITIVE_INFINITY
        for (let action of this.#actions(board)) v = Math.min(v, this.#maxValue(this.#result(board, action)))
        return v
    }

    // Handles events.
    static #handler(board, elementIndex){
        const currentPlayer = this.#player(board)
        const symbolElement = document.createElement('span')
        symbolElement.className = 'symbol'
        symbolElement.classList.add(`symbol-${currentPlayer}`);
        symbolElement.innerHTML = currentPlayer.toUpperCase()
        document.getElementsByClassName('iceXO-cell').item(elementIndex).appendChild(symbolElement)
        // Changes board
         board[Math.ceil((elementIndex+1)/(squareNum/3)) -1][elementIndex%(squareNum/3)] = currentPlayer
        if (currentPlayer === firstPlayer){
            this.#engine(board)
        }
    }

    // Engine
    static #engine(board){
        if (this.#terminal(board)) return null

        // Make it random if it's the first move
        if (board.every(row => row.every(cell => cell === EMPTY))) return this.#handler(board, this.#actionToIndex([random(0, 2), random(0, 2)]))

        const currentPlayer = this.#player(board)
        let bestAction = []
        let v;
        if (currentPlayer === X) v = Number.NEGATIVE_INFINITY
        else v = Number.POSITIVE_INFINITY
        this.#actions(board).forEach(action => {
            const res = this.#result(board, action)
            if (currentPlayer === X){
                if (this.#minValue(res) > v){
                    v = this.#minValue(res)
                    bestAction = action
                }
            }
            else{
                if (this.#maxValue(res) < v){
                    v = this.#maxValue(res)
                    bestAction = action
                }
            }
        })
        this.#handler(board, this.#actionToIndex(bestAction))
    }

    // Builds element in DOM
   static  #buildElements(parent){
        const container = document.querySelector(parent)
        const parentElement = document.createElement('div')
        parentElement.id = 'iceXO-board'
        for (let i=0; i< squareNum ; i++){
            const element = document.createElement('div')
            element.className = 'iceXO-cell'
            parentElement.appendChild(element)
        }
        container.appendChild(parentElement)
    }

    // Configures all settings
    static #config(settings){
        const cells = document.querySelectorAll(`.iceXO-cell`)
        const root = document.querySelector(':root')
        document.body.style.backgroundColor = settings.body || defaultBackgroundColor
        document.documentElement.style.setProperty('--fancy', settings.fancyColor ||  getComputedStyle(root).getPropertyValue('--fancy'))
        document.documentElement.style.setProperty('--x-color', settings.XColor ||  getComputedStyle(root).getPropertyValue('--x-color'))
        document.documentElement.style.setProperty('--o-color', settings.OColor || getComputedStyle(root).getPropertyValue('--o-color'))
        cells.forEach(cell => cell.style.backgroundColor = settings.boardColor || defaultBackgroundColor)
    }

    // Creates restart elements
    static #restartGame(parent){
        const overlay = document.createElement('div')
        overlay.id = 'overlay'
        document.body.appendChild(overlay)
        const parentElement = document.querySelector(parent)
        const button = document.createElement('button')
        button.innerText = 'Restart Game'
        button.className = 'iceXO-button'
        parentElement.appendChild(button)
        button.onclick = () => location.reload()
    }

    // Specifies the player
    static #choosePlayer(parent, settings) {
        const overlay = document.createElement('div')
        overlay.id = 'overlay'
        document.body.appendChild(overlay)
        const parentElement = document.querySelector(parent)
        const XButton = document.createElement('button')
        const OButton = document.createElement('button')
        OButton.innerText = 'Play as O'
        OButton.className = 'iceXO-button'
        XButton.innerText = 'Play as X'
        XButton.className = 'iceXO-button'
        XButton.style.top = '70%'
        XButton.style.color = settings.boardColor || defaultBackgroundColor
        OButton.style.color = settings.boardColor || defaultBackgroundColor
        parentElement.appendChild(OButton)
        parentElement.appendChild(XButton)
        OButton.onclick = () => {
            overlay.remove()
            XButton.remove()
            OButton.remove()
            firstPlayer = O
            this.#engine(state)
        }
        XButton.onclick = () => {
            overlay.remove()
            XButton.remove()
            OButton.remove()
        }

    }

    //Starts playing
    static play(parent, settings = {}){
        this.#buildElements(parent)
        this.#config(settings)
        this.#choosePlayer(parent, settings)
        document.addEventListener('click',(e)=> {
                if (e.target && e.target.className === 'iceXO-cell'){
                    if (!this.#terminal(state)){
                        this.#handler(state, getChildIndex(e.target))
                        if (this.#terminal(state)){
                            settings.gameOverEvent ?  settings.gameOverEvent(this.#winner(state)) : alert(`${this.#winner(state) || 'No One'} Wins`)
                            this.#restartGame(parent)
                        }
                    }
            }
        })
    }
}
