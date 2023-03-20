import { getFilteredPins } from "../../store/pins";
import { useSelector } from "react-redux";
import { useState } from "react";
import PinCard from "../PinCard";
import LandingPagePins from "../LandingPagePins";


export default function FilterPins() {
    // const dispatch = useDispatch()
    const allPins = useSelector((state) => state.pinsReducer)
    const pins = Object.values(allPins.FiltPins)

    const [searchTerm, setSearchTerm] = useState("");

    const sizes = ['small', 'medium', 'large']
    let index = 0



    return pins.length ? (
        <>
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
    ): <div>No Results</div>
}

const styles = {
    pin_container: {
        margin: 0,
        padding: 0,
        width: '100%',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 250px)',
        gridAutoRows: '10px',
        justifyContent: 'center',
    }
}
