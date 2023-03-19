import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserPins } from '../../store/pins'
import OpenModalButton from "../OpenModalButton";
import CreatedPinModal from '../CreatedPinModal';
import { NavLink } from 'react-router-dom'
import SingleMyPin from '../SingleMyPin';



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


  return (
    <>
    {currentUserPins.length > 0 ? (
        currentUserPins.map((pin) => {
            return (
              <div>
               <SingleMyPin pin={pin}/>
            </div>
            )
        })
    ): (
        <div>No pins created</div>
    )}
    </>
  )

}
