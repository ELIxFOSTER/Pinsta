import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNewPin } from "../../store/pins";

export default function CreatePinForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const pinData = {
      title,
      description,
      imageUrl,
    };

    dispatch(createNewPin(pinData));
  };

  return (
    <>
      <h1>Create Pin</h1>

      <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Title'
            required
        />
        <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='description'
            required
        />
        <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder='URL'
            required
        />
        <button>Create Pin</button>
      </form>
    </>
  );
}
