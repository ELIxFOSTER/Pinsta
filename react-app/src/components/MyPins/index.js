import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserPins } from '../../store/pins'
import OpenModalButton from "../OpenModalButton";
import CreatedPinModal from '../CreatedPinModal';
import { NavLink } from 'react-router-dom'



export default function MyPins() {
const dispatch = useDispatch()
const [pins, setPins] = useState([])

const userPins = useSelector((state) => state.pinsReducer)

const currentUserPins = Object.values(userPins.UserPins)

const [showMenu, setShowMenu] = useState(false);

const openMenu = () => {
  if (showMenu) return;
  setShowMenu(true);
};

useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(getCurrentUserPins());
      setPins(response);
    };
    fetchData();
  }, [dispatch]);

  const closeMenu = () => setShowMenu(false);

  return (
    <>
    {currentUserPins.length > 0 ? (
        currentUserPins.map((pin) => {
            return (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src={pin.imageUrl}/>
                {/* <NavLink to={`/edit-pin/${pin.id}`} style={{ position: 'absolute', bottom: '5px', right: '5px' }}>Edit</NavLink> */}
                <OpenModalButton
              buttonText="Edit"
              onItemClick={closeMenu}
              modalComponent={<CreatedPinModal pin={pin}/>}
            />
                </div>
            )
        })
    ): (
        <div>No pins created</div>
    )}
    </>
  )

}
