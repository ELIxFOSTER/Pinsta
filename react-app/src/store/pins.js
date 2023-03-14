const LOAD_PINS = 'pins/LOAD_PINS'
const LOAD_PIN_DETAILS = 'pins/LOAD_PIN_DETAILS'
const CREATE_PIN = 'pins/CREATE_PIN'

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

const createPin = (pin) => {
    return {
        type: CREATE_PIN,
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

export const createNewPin = (pinData) => async dispatch => {
    const response = await fetch('/api/pins/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pinData)
    })

    if (response.ok) {
        const data = await response.json()

        dispatch(createPin(data))
    } else {
        return 'Create pin error'
    }
}

const initialState = { AllPins: {}, PinDetails: {}, userPins: {} }

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
        case CREATE_PIN: {
            pinsState.userPins[action.pin.id] = action.pin
            return pinsState
        }
        default:
            return state
    }
}

export default pinsReducer
