
import { NavLink, useParams } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { removeSinglePin } from "../../store/board"



export default function SinglePin({pin}) {
    const dispatch = useDispatch()
    const {id} = useParams()

    const [pinDown, setPin] = useState(false)
    const pinCss = pinDown ? "pin-dropdown-menu": 'hidden'

    const dotHandler = async (e) => {
        e.stopPropagation()
        e.preventDefault()

        // await dispatch(removeSinglePin(pin.id))


        setPin(!pinDown)
    }

    const removeHandler = async (e) => {
        e.stopPropagation()
        e.preventDefault()

        await dispatch(removeSinglePin({id, pinId: pin.id}))
    }


    return pin && (
        <div className='pin-pics' style={{display: 'flex', justifyContent: 'space-between'}}>
            <NavLink to={`/pins/${pin.id}`}>
                    <div className='single-pin'>
                        <div className="content"><i onClick={dotHandler} className="fa-solid fa-ellipsis"></i><p>{pin.title}</p></div>
                            <div className={pinCss}>

                                    <ul style={{listStyle: 'none', padding: '1px 10px'}}>
                                        <li onClick={removeHandler}>Remove Pin</li>
                                    </ul>

                            </div>
                        <img src={pin.imageUrl} alt='Image'/>

                    </div>
            </NavLink>
        </div>
    )
}
