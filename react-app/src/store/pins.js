const LOAD_PINS = 'pins/LOAD_PINS'
const LOAD_PIN_DETAILS = 'pins/LOAD_PIN_DETAILS'
const CREATE_PIN = 'pins/CREATE_PIN'
const LOAD_CURRENTUSER_PINS = 'pins/LOAD_CURRENTUSER_PINS'
const LOAD_FILTERED = 'pins/LOAD_FILTERED'
const RESET_PIN = 'pins/RESET_PINS'
const DELETE_PIN ='pin/DELETE_PIN'
const EDIT_PIN ='pin/EDIT_PIN'



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

const loadFiltered = (data) => {
    return {
        type:LOAD_FILTERED,
        filPins: data
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

export const resetPinDetails = () => {
    return {
        type: RESET_PIN
    }
}


export const getAllPins = () => async (dispatch) => {
    const response = await fetch('/api/pins/')

    if (response.ok) {
        const pinsData = await response.json()
        dispatch(loadPins(pinsData))
    }
}

export const getFilteredPins = (obj) => async dispatch => {
    const response = await fetch('/api/pins/filtered', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    if(response.ok) {
        const data = await response.json()
        dispatch(loadFiltered(data))
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
        dispatch(createPin(data))
        return null
    } else if (response.status < 500) {
        const data = await response.json()
        return data.errors
    } else {
        return ["Error occured, please try again!"]
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

export const editPinThunk = (pinData, pinId) => async dispatch => {
    const response = await fetch(`/api/pins/${pinId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pinData)
    }
    )

    if(response.ok) {
        const data = await response.json()
        dispatch(editPin(data))
    }

}

const editPin = (data) => {
    return {
        type: EDIT_PIN,
        payload: data
    }
}

export const deletePinThunk = (pinId) => async dispatch => {
    const response =  await fetch(`/api/pins/${pinId}`, {
        method: 'DELETE'
    })

    if(response.ok) {
        dispatch(deletePin(pinId))
    }
}

//delete action creator
const deletePin = (pinId) => {
    return {
        type: DELETE_PIN,
        payload: pinId
    }
}


const initialState = { AllPins: {}, PinDetails: {}, UserPins: {}, FiltPins: {} }

const pinsReducer = (state = initialState, action) => {
    const pinsState = { ...state }
    switch (action.type) {
        case LOAD_PINS: {
            action.allPins.forEach((ele) => pinsState.AllPins[ele.id] = ele)
            return pinsState
        }
        case LOAD_FILTERED: {
            pinsState.FiltPins = {}
            action.filPins.forEach((ele) => pinsState.FiltPins[ele.id] = ele)
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
        case RESET_PIN: {
            pinsState.PinDetails = {}
            return pinsState
        }
        case DELETE_PIN: {
            const newState = {...state, UserPins: {...state.UserPins}, AllPins: {}}
            delete newState.UserPins[action.payload]
            return newState
        }

        case EDIT_PIN: {
            const newState = {...state, UserPins: {...state.UserPins}}
            newState.UserPins[action.payload.id] = action.payload
            return newState
        }


        default:
            return state
    }
}

export default pinsReducer
