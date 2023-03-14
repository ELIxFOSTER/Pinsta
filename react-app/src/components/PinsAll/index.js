import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_all_boards } from '../../store/board'
import { getAllPins } from '../../store/pins'
import { NavLink } from 'react-router-dom'

export default function PinsAll() {
    const dispatch = useDispatch()
    console.log('state', useSelector((state) => state))
    const allPins = useSelector((state) => state.pinsReducer.AllPins)
    const pins = Object.values(allPins)
    console.log('pins', pins)
    console.log('allPins', allPins)



    useEffect(() => {
        dispatch(getAllPins())
        dispatch(get_all_boards())
    }, [dispatch])

    // if (!pins.length) return null

    return (
        <>
            {pins.map((pin) => {
                return (
                    <>
                        <NavLink to={`/pins/${pin.id}`}>
                            <div>{pin.title}</div>
                        </NavLink>
                    </>
                )
            })}
        </>
    )
}