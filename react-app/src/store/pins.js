const LOAD_PINS = 'pins/LOAD_PINS'
const LOAD_PIN_DETAILS = 'pins/LOAD_PIN_DETAILS'
const CREATE_PIN = 'pins/CREATE_PIN'
const LOAD_CURRENTUSER_PINS = 'pins/LOAD_CURRENTUSER_PINS'


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

const loadCurrentUserPins = (pins) => {
    return {
        type: LOAD_CURRENTUSER_PINS,
        pins
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
        body: pinData
    })

    if (response.ok) {
        const data = await response.json()
        console.log(data)
        dispatch(createPin(data))
    } else {
        return 'Create pin error'
    }
}

export const getCurrentUserPins = () => async (dispatch) => {
    const response = await fetch('/api/pins/current')

    if (response.ok) {
        const pinData = await response.json()
        const normalizedPins = normalizer(pinData)
        dispatch(loadCurrentUserPins(normalizedPins))
        return pinData
    }
}

export const editPinThunk = (pinData, pinId) => async () => {
    const response = await fetch(`/api/pins/${pinId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pinData)
    }
    )

    const pinJson = await response.json()
    return pinJson
}

const initialState = { AllPins: {}, PinDetails: {}, UserPins: {} }

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
            pinsState.UserPins[action.pin.id] = action.pin
            return pinsState
        }
        case LOAD_CURRENTUSER_PINS: {
            pinsState.UserPins = action.pins
            return pinsState
        }
        default:
            return state
    }
}

export default pinsReducer
