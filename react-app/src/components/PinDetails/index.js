import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import pinsReducer from '../../store/pins'
import { getPinDetails } from '../../store/pins'
import { useParams } from 'react-router-dom'


export default function PinDetails() {
    const dispatch = useDispatch()
    const pinId = useParams()
    console.log('pinId', pinId.pinId)

    const pin = useSelector((state) => state.pinsReducer.PinDetails)

    useEffect(() => {
        dispatch(getPinDetails(pinId.pinId))
    }, [dispatch])


    return (
        <>
        <div>title: {pin.title}</div>
        <div>id: {pin.id}</div>
        <div>description: {pin.description}</div>
        <div>imageUrl: pin.imageUrl</div>
        <div>userId: {pin.userId}</div>
        </>
    )
}
