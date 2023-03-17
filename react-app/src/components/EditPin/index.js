import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPinDetails, resetPinDetails } from "../../store/pins";
import { editPinThunk } from "../../store/pins";

export default function EditPin() {
  const dispatch = useDispatch();
  const { pinId } = useParams();

  const pin = useSelector((state) => state.pinsReducer.PinDetails);
  const history = useHistory();

  const [title, setTitle] = useState(pin.title || '');
  const [description, setDescription] = useState(pin.description || '');

  console.log(pin)

  useEffect(() => {
    dispatch(getPinDetails(pinId));

    return () => {
      dispatch(resetPinDetails())
    }
  }, [dispatch]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    let pinData = {
      title,
      description
    };

    const newPin = await dispatch(editPinThunk(pinData, pinId));
    if (newPin) {
      history.push("/");
    }
}

    // if (!Object.values(pin).length) return null;

    return pin && (
      <>
        <h1>Edit Pin Form</h1>
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'
                required
            />
            <textarea
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='description'
                required
            />
            <button>Submit</button>
        </form>
      </>
    );
}
