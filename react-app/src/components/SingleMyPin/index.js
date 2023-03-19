
import { NavLink, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { removeSinglePin } from "../../store/board"
import { useModal } from "../../context/Modal"
import { useRef } from "react"
import CreatedPinModal from "../CreatedPinModal"
import OpenModalLi from "../OpenFormLi"


export default function SingleMyPin({pin}) {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {closeModal} = useModal()

    const [pinDown, setPin] = useState(false)
    const pinCss = pinDown ? "pin-dropdown-menu": 'hidden'

    const menu = useRef(null)

    const dotHandler = async (e) => {
        e.stopPropagation()
        e.preventDefault()

        // await dispatch(removeSinglePin(pin.id))


        setPin(!pinDown)
    }


    const closeOpenMenus = e => {
        if(menu.current && pinCss && !menu.current.contains(e.target)) {
          setPin(false)
        }
      }

    const removeHandler = async (e) => {
        e.stopPropagation()
        e.preventDefault()

        await dispatch(removeSinglePin({id, pinId: pin.id}))
        setPin(!pinDown)
    }

    document.addEventListener('mousedown', closeOpenMenus)

    useEffect(() => {
        return () => {
            setPin(false)
        }
    }, [])


    return pin && (
        <div className='pin-pics' style={{display: 'flex', justifyContent: 'space-between'}}>
            <NavLink to={`/pins/${pin.id}`}>
                    <div className='single-pin'>
                        <div className="content"><i onClick={dotHandler} className="fa-solid fa-ellipsis"></i><p>{pin.title}</p></div>
                            <div ref={menu} className={pinCss}>

                            <ul className="single-my" onClick={e => {
                                e.preventDefault()
                                setPin(false)
                                }} style={{listStyle: 'none', padding: '1px 10px'}}>
                                        <OpenModalLi modalComponent={<CreatedPinModal pin={pin}/>} buttonText='Edit' />
                                      </ul>

                            </div>
                        <img src={pin.imageUrl} alt='Image'/>

                    </div>
            </NavLink>
        </div>
    )
}
