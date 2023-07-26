import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPins } from '../../store/pins'
import { NavLink } from 'react-router-dom'
import PinCard from '../PinCard'
import LandingPagePins from '../LandingPagePins'
import { FaGithub } from "react-icons/fa";
import './PinsAll.css'

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
        <div className='main-page-wrapper'>

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
            <footer>
      <div className="footer-container">
          <NavLink to={{ pathname: "https://github.com/tvongvone" }} style={{ textDecoration: "none", color: "inherit" }} target="_blank" rel="noreferrer">
        <div className="logo-container">
            <FaGithub className="logo" />
            <div>Tony Vongvone</div>
        </div>
          </NavLink>
          <NavLink to={{ pathname: "https://github.com/ELIxFOSTER" }} style={{ textDecoration: "none", color: "inherit" }} target="_blank" rel="noreferrer">
        <div className="logo-container">
            <FaGithub className="logo" />
            <div>Eli Foster</div>
        </div>
          </NavLink>
          <NavLink to={{ pathname: "https://github.com/evnxprk" }} style={{ textDecoration: "none", color: "inherit" }} target="_blank" rel="noreferrer">
        <div className="logo-container">
            <FaGithub className="logo" />
            <div>Eunice Park</div>
        </div>
          </NavLink>
      </div>
    </footer>
        </div>
    ): <div className="loading-screen">Loading...</div>
}

const styles = {
    pin_container: {
        margin: 0,
        marginBottom: '45px',
        padding: 0,
        width: '100%',
        // backgroundColor: 'black',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 250px)',
        gridAutoRows: '10px',
        justifyContent: 'center',
    }
}
