const LOAD_PINS = '/pins/LOAD_PINS'


const loadPins = (allPins) => {
    return {
        type: LOAD_PINS,
        allPins
    }
}

export const getAllPins = () => async (dispatch) => {
    const response = await fetch('/api/pins')

    if (response.ok) {
        const pinsJson = await response.json()
        dispatch(loadPins(pinsJson.Pins))
    }
}

const initialState = { AllPins: {}, PinDetails: {} }

const pinsReducer = (state = initialState, action) => {
    const pinsState = { ...state }
    switch (action.type) {
        case LOAD_PINS: {
            pinsState.AllPins = action.allPins
            return pinsState
        }
        default:
            return state
    }
}

export default pinsReducer
