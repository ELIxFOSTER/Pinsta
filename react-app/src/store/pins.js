const LOAD_PINS = 'pins/LOAD_PINS'

const normalizer = (data) => {
    const normalData = {}
    data.forEach((element) => normalData[element.id] = element)
    return normalData
}


const loadPins = (allPins) => {
    return {
        type: LOAD_PINS,
        allPins
    }
}

export const getAllPins = () => async (dispatch) => {
    const response = await fetch('/api/pins/')

    if (response.ok) {
        const pinsData = await response.json()
        dispatch(loadPins(pinsData))
    }
}

const initialState = { AllPins: {}, PinDetails: {} }

const pinsReducer = (state = initialState, action) => {
    const pinsState = { ...state }
    switch (action.type) {
        case LOAD_PINS: {
            action.allPins.forEach((ele) => pinsState.AllPins[ele.id] = ele)
            return pinsState
        }
        default:
            return state
    }
}

export default pinsReducer
