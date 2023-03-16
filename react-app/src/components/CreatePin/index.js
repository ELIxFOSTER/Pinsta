import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNewPin } from "../../store/pins";

export default function CreatePinForm() {
  const dispatch = useDispatch();
  const history = useHistory()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState('');
  const [validationErrors, setErrors] = useState([])
  const [hasSubmitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true)
    if (validationErrors.length) return ("Your post has errors, cannot submit!")

    const formData = new FormData()


    formData.append('title', title)
    formData.append('description', description)
    formData.append('imageUrl', imageUrl)

    // const pinData = {
    //   title,
    //   description,
    //   imageUrl,
    // };

    await dispatch(createNewPin(formData));

    setTitle("")
    setDescription("")
    setImageUrl("")
    setErrors([])
    setSubmitted(false)
    history.push('/created-pins')
  };

  useEffect(() => {
    const errors = []
    if (!title.length) errors.push('Please enter a title for this Pin')
    if(!description.length) errors.push('Please enter a description')
    if(!imageUrl) errors.push("Please provide an image!")
    setErrors(errors)
  }, [title, description, imageUrl])

  return (
    <>
      <h1>Create Pin</h1>
      {hasSubmitted && validationErrors.length > 0 && (
        <div className='errors-info'>
          <h2>The following errors were found</h2>
          <ul>
            {validationErrors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
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
        />
        <button type="submit">Create Pin</button>
      </form>
    </>
  );
}
