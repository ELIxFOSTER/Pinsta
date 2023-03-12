
const GET_BOARDS="boards/get_Boards"

const getBoards = (list) => {
    return {
        type: GET_BOARDS,
        payload: list
    }
}


export const get_all_boards = () => async dispatch => {
    const response = await fetch("/api/boards/")

    if(response.ok) {
        const data = await response.json();

        dispatch(getBoards(data))
    }


}

let initialState = {}


export default function reducer(state=initialState, action) {
    switch (action.type) {
        case GET_BOARDS:
            const newState = {...state}
            action.payload.forEach(ele => newState[ele.id] = ele)
            return newState
        default:
            return state;
    }
}
