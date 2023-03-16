import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPinDetails } from '../../store/pins'
import { useParams } from 'react-router-dom'
import PinDetailsCard from '../PinDetailsCard'
import './PinDetails.css'


export default function PinDetails() {
    const dispatch = useDispatch()
    const pinId = useParams()
    console.log('pinId', pinId.pinId)

    const pin = useSelector((state) => state.pinsReducer.PinDetails)
    const sessionUser = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getPinDetails(pinId.pinId))
    }, [dispatch, pinId.pinId])


    return (
        <div className='pin-details-wrapper'>
            <PinDetailsCard pin={pin} sessionUser={sessionUser}/>
        </div>
    )
}
