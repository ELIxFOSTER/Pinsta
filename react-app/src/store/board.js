
const GET_BOARDS="boards/get_Boards"
const GET_SINGLE_BOARD = "boards/get_single_board"

const getBoards = (list) => {
    return {
        type: GET_BOARDS,
        payload: list
    }
}

const getSingleBoard = (obj) => {
    return {
        type: GET_SINGLE_BOARD,
        payload: obj
    }
}


export const get_all_boards = () => async dispatch => {
    const response = await fetch("/api/boards/")

    if(response.ok) {
        const data = await response.json();

        dispatch(getBoards(data))
    }


}

export const get_single_board = (id) => async dispatch => {
    const response = await fetch(`/api/boards/${id}`)

    if(response.ok) {
        const data = await response.json()

        dispatch(getSingleBoard(data))
    }
}

let initialState = {
    userBoards: {},
    singleBoard: {}
}


export default function reducer(state=initialState, action) {
    switch (action.type) {
        case GET_BOARDS: {
            const newState = {...state}
            action.payload.forEach(ele => newState.userBoards[ele.id] = ele)
            return newState
        }
        case GET_SINGLE_BOARD: {
            const newState = {...state, singleBoard: {}}
            newState.singleBoard = action.payload
            return newState
        }
        default:
            return state;
    }
}
