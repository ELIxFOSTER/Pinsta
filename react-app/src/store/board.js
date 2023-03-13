
const GET_BOARDS="boards/get_Boards"
const GET_SINGLE_BOARD = "boards/get_single_board"
const CREATE_BOARD = 'boards/create_board'

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

const createSingleBoard = (obj) => {
    return {
        type: CREATE_BOARD,
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

export const create_board = (obj) => async dispatch => {
    const response = await fetch(`/api/boards/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    if(response.ok) {
        const data = await response.json()

        dispatch(createSingleBoard(data))
    } else {
        return 'Recieved unknown Error'
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
        case CREATE_BOARD: {
            const newState = {...state, userBoards: {...state.userBoards}}
            newState.userBoards[action.payload.id] = action.payload
            return newState;
        }
        default:
            return state;
    }
}
