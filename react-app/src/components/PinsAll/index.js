import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPins } from '../../store/pins'
import { NavLink } from 'react-router-dom'
import './PinsAll.css'

export default function PinsAll() {
    const dispatch = useDispatch()
    const allPins = useSelector((state) => state.pinsReducer)
    const pins = Object.values(allPins.AllPins)

    console.log('State allPins', allPins)
    console.log('Array allPins', pins)

    useEffect(() => {
        dispatch(getAllPins())
        // dispatch(get_all_boards())
    }, [dispatch])

    return pins.length && (
        <div className='all-pins-wrapper'>
            {pins.map((pin) => {
                return (
                    <>
                        <NavLink to={`/pins/${pin.id}`}>
                            <img id='pin-image' src={pin.imageUrl}></img>
                            <div>{pin.title}</div>
                        </NavLink>
                    </>
                )
            })}
        </div>
    )
}
