import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserPins } from '../../store/pins'
import SingleMyPin from '../SingleMyPin';



export default function MyPins() {
const dispatch = useDispatch()
const [pins, setPins] = useState([])

const userPins = useSelector((state) => state.pinsReducer)

const currentUserPins = Object.values(userPins.UserPins)

const [showMenu, setShowMenu] = useState(false);

// const openMenu = () => {
//   if (showMenu) return;
//   setShowMenu(true);
// };

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
      <div className='board-container'>
      <div className='board-header'>
          <h1 style={{fontSize: '36px'}}>My Pins</h1>

          <div className='board-dropdown-container'>
          </div>
      </div>

  <div  style={{display: 'flex', flexWrap: 'wrap'}}>
      {currentUserPins.map((pin) => {
            return (
              <div>
               <SingleMyPin pin={pin}/>
            </div>
            )
        })}
  </div>
</div>
    ): (
        <div>No pins created</div>
    )}
    </>
  )

}
