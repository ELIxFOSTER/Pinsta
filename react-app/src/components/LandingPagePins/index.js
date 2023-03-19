
import { NavLink, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addPinToBoard, removeSinglePin } from "../../store/board"
import './pincard.css'
import { useSelector } from "react-redux"
import { useRef } from "react"



export default function LandingPagePins({pin, size}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const userBoards = useSelector(state => state.boards)

    const boards = Object.values(userBoards.userBoards)


    const [pinDown, setPin] = useState(false)

    const menu = useRef(null)

    const pinCss = pinDown ? "pin-dropdown-menu": 'hidden'

    const closeOpenMenus = e => {
      if(menu.current && pinCss && !menu.current.contains(e.target)) {
        setPin(false)
      }
    }

    const dotHandler = async (e) => {
        e.stopPropagation()
        e.preventDefault()

        // await dispatch(removeSinglePin(pin.id))


        setPin(!pinDown)
    }

    useEffect(() => {
      return () => {
        setPin(false)
      }
    }, [])

    document.addEventListener('mousedown', closeOpenMenus)


    // const removeHandler = async (e) => {
    //     e.stopPropagation()
    //     e.preventDefault()

    //     await dispatch(removeSinglePin({id, pinId: pin.id}))
    //     setPin(!pinDown)
    //     closeModal()
    // }


    return pin && (
        <div className='what'
      style={{
        ...styles.singlePin,
        ...styles[size],
      }}
    >

            <NavLink to={`/pins/${pin.id}`}>
                        <div className="content"><i onClick={dotHandler} className="fa-solid fa-ellipsis"></i><p>{pin.title}</p></div>
                            <div ref={menu} className={pinCss}>

                                    {user ? (
                                      <ul onClick={e => e.preventDefault()} style={{listStyle: 'none', padding: '1px 10px'}}>
                                        <li onClick={e => e.preventDefault()}>Add to your boards:</li>
                                        {
                                          boards.map(board => (
                                            <li onClick={async e => {
                                              e.preventDefault()
                                              await dispatch(addPinToBoard({boardId: board.id, pinId: pin.id}))
                                              setPin(false)
                                            }} className='list' key={board.id}>{board.name}</li>
                                          ))
                                        }
                                      </ul>

                                    ): <ul style={{listStyle: 'none', padding: '1px 10px'}}>
                                      <li onClick={e => e.preventDefault()}>You must be logged in to add to boards!</li>
                                      </ul>}

                            </div>
                        <img style={styles.img} src={pin.imageUrl} alt='Image'/>


            </NavLink>
    </div>
    )
}


const styles = {
    singlePin: {
      margin: "15px 10px",
      padding: 0,
      borderRadius: "16px",
      // backgroundColor: "gray",
    },
    small: {
      gridRowEnd: "span 26",
    },
    medium: {
      gridRowEnd: "span 33",
    },
    large: {
      gridRowEnd: "span 45",
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  };
