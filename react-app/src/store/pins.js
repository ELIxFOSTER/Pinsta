const LOAD_PINS = 'pins/LOAD_PINS'
const LOAD_PIN_DETAILS = 'pins/LOAD_PIN_DETAILS'

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

const loadPinDetails = (pin) => {
    return {
        type: LOAD_PIN_DETAILS,
        pin
    }
}

export const getAllPins = () => async (dispatch) => {
    const response = await fetch('/api/pins/')

    if (response.ok) {
        const pinsData = await response.json()
        dispatch(loadPins(pinsData))
    }
}

export const getPinDetails = (pinId) => async (dispatch) => {
    const response = await fetch(`/api/pins/${pinId}`)

    if (response.ok) {
        const pinData = await response.json()
        dispatch(loadPinDetails(pinData))
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
        case LOAD_PIN_DETAILS: {
            pinsState.PinDetails = action.pin
            return pinsState
        }
        default:
            return state
    }
}

export default pinsReducer
