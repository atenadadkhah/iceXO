"""
Tic Tac Toe Player
"""

import math
import copy
import random

X = "X"
O = "O"
terminalOptions = [
    {0, 1, 2},
    {3, 4, 5},
    {6, 7, 8},
    {0, 3, 6},
    {1, 4, 7},
    {2, 5, 8},
    {0, 4, 8},
    {2, 4, 6}
]
EMPTY = None


def initial_state():
    """
    Returns starting state of the board.
    """
    return [
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]
    ]


def player(board):
    """
    Returns player who has the next turn on a board.
    """
    x_count = 0
    o_count = 0
    for row in board:
        x_count += row.count(X)
        o_count += row.count(O)
    return X if x_count == o_count else O


def actions(board):
    """
    Returns set of all possible actions (i, j) available on the board.
    """
    a = set()
    for i, row in enumerate(board):
        for j, cell in enumerate(row):
            if not cell:
                a.add((i, j))
    return a


def result(board, action):
    """
    Returns the board that results from making move (i, j) on the board.
    """
    current_player = player(board)
    new_board = copy.deepcopy(board)
    if not new_board[action[0]][action[1]]:
        new_board[action[0]][action[1]] = current_player
        return new_board
    raise "This Cell Isn't Empty!"


def winner(board):
    """
    Returns the winner of the game, if there is one.
    """
    board_index = 0
    x_index = set()
    o_index = set()
    for row in board:
        for place in row:
            if place == X:
                x_index.add(board_index)
            elif place == O:
                o_index.add(board_index)
            board_index += 1

    for terminalOption in terminalOptions:
        if terminalOption.issubset(x_index):
            return X
        elif terminalOption.issubset(o_index):
            return O
    return None


def terminal(board):
    """
    Returns True if game is over, False otherwise.
    """
    if winner(board):
        return True
    for row in board:
        for place in row:
            if not place:
                return False
    return True


def utility(board):
    """
    Returns 1 if X has won the game, -1 if O has won, 0 otherwise.
    """
    if winner(board) == X:
        return 1
    elif winner(board) == O:
        return -1
    return 0


def min_value(board):
    if terminal(board):
        return utility(board)
    v = math.inf
    for action in actions(board):
        v = min(v, max_value(result(board, action)))
    return v


def max_value(board):
    if terminal(board):
        return utility(board)
    v = -1 * math.inf
    for action in actions(board):
        v = max(v, min_value(result(board, action)))
    return v


def minimax(board):
    if terminal(board):
        return None
    # Make it random if it's the first move
    if board == initial_state():
        return tuple((random.randint(0, 2), random.randint(0, 2)))

    current_player = player(board)
    best_action = set()
    if current_player == X:
        v = -1 * math.inf
    else:
        v = math.inf
    for action in actions(board):
        res = result(board, action)
        if current_player == X:
            if min_value(res) > v:
                v = min_value(res)
                best_action = action
        else:
            if max_value(res) < v:
                v = max_value(res)
                best_action = action
    return best_action
