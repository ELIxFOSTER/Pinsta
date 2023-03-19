import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPins } from '../../store/pins'
import { NavLink } from 'react-router-dom'
import PinCard from '../PinCard'
import LandingPagePins from '../LandingPagePins'
// import './PinsAll.css'

export default function PinsAll() {
    const dispatch = useDispatch()
    const allPins = useSelector((state) => state.pinsReducer)
    const pins = Object.values(allPins.AllPins)

    const [searchTerm, setSearchTerm] = useState("");

    const sizes = ['small', 'medium', 'large']
    let index = 0

    useEffect(() => {
        dispatch(getAllPins())
        // dispatch(get_all_boards())
    }, [dispatch])

    return pins.length ? (
        <>

            {/* <form>      //* Quick Filter Search
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Quick Search"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </form> */}

            <div style={styles.pin_container} >
                {pins.filter((pin => {
                    return searchTerm.toLowerCase() === '' ? pin : pin.title.toLowerCase().includes(searchTerm)
                })).map((pin, i) => {
                    const size = sizes[i % sizes.length];
                    index++
                    return (
                        <LandingPagePins size={size} pin={pin}/>
                    )
                })}
            </div>
        </>
    ): <div>Loading...</div>
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
