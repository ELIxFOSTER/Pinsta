import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserPins } from '../../store/pins'
import { NavLink } from 'react-router-dom'



export default function MyPins() {
const dispatch = useDispatch()
const [pins, setPins] = useState([])

const currentUserPins = useSelector((state) => Object.values(state.pinsReducer.UserPins))

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
                <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src={pin.imageUrl}/>
                <NavLink to={`/edit-pin/${pin.id}`} style={{ position: 'absolute', bottom: '5px', right: '5px' }}>Edit</NavLink>
                </div>
            )
        })
    ): (
        <div>No pins created</div>
    )}
    </>
  )

}
