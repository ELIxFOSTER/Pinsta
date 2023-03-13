import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPins } from '../../store/pins'

export default function PinsAll() {
    const dispatch = useDispatch()
    console.log('state', useSelector((state) => state))
    const allPins = useSelector((state) => state)
    const pins = Object.values(allPins)
    console.log('pins', pins)
    console.log('allPins', allPins)



    useEffect(() => {
        dispatch(getAllPins)
    }, [dispatch])

    // if (!pins.length) return null

    return (
        <>
            {pins.map((pin) => {
                return (
                    <div>{pin.title}</div>
                )
            })}
        </>
    )
}
