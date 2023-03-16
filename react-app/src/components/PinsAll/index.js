import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPins } from '../../store/pins'
import { NavLink } from 'react-router-dom'
import PinCard from '../PinCard'
// import './PinsAll.css'

export default function PinsAll() {
    const dispatch = useDispatch()
    const allPins = useSelector((state) => state.pinsReducer)
    const pins = Object.values(allPins.AllPins)

    console.log('State allPins', allPins)
    console.log('Array allPins', pins)

    const sizes = ['small', 'medium', 'large']
    let index = 0

    useEffect(() => {
        dispatch(getAllPins())
        // dispatch(get_all_boards())
    }, [dispatch])

    return pins.length && (
        // <div className='all-pins-wrapper'>
        //     {pins.map((pin) => {
        //         return (
        //             <>
        //                 <NavLink to={`/pins/${pin.id}`}>
        //                     <img id='pin-image' src={pin.imageUrl}></img>
        //                     <div>{pin.title}</div>
        //                 </NavLink>
        //             </>
        //         )
        //     })}
        // </div>
        <div style={styles.pin_container} >
            {pins.map((pin, i) => {
                const size = sizes[i % sizes.length];
                index++
                return (
                    <PinCard size={size} pin={pin}/>
                )
            })}
        </div>
    )
}

const styles = {
    pin_container: {
        margin: 0,
        padding: 0,
        width: '100%',
        // backgroundColor: 'black',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 250px)',
        gridAutoRows: '10px',
        justifyContent: 'center',
    }
}
