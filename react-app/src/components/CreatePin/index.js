import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNewPin } from "../../store/pins";

export default function CreatePinForm() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData()


    formData.append('title', title)
    formData.append('description', description)
    formData.append('imageUrl', imageUrl)

    // const pinData = {
    //   title,
    //   description,
    //   imageUrl,
    // };

    dispatch(createNewPin(formData));
  };

  return (
    <>
      <h1>Create Pin</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
            id='title'
            type="text"
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Title'
            required
        />
        <textarea
            id='description'
            name='description'
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='description'
            required
        />
        <input
            id='imageUrl'
            name='imageUrl'
            type="file"
            onChange={(e) => setImageUrl(e.target.files[0])}
            placeholder='Drag in file'
            required
        />
        <button type="submit">Create Pin</button>
      </form>
    </>
  );
}
