import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNewPin } from "../../store/pins";
import './CreatePin.css'

export default function CreatePinForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [validationErrors, setErrors] = useState([]);
  const [hasSubmitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);
    if (validationErrors.length) return "Your post has errors, cannot submit!";

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("imageUrl", imageUrl);

    // const pinData = {
    //   title,
    //   description,
    //   imageUrl,
    // };

    const data = await dispatch(createNewPin(formData));

    if (data) {
      setErrors(data);
    } else {
      setTitle("");
      setDescription("");
      setImageUrl("");
      setErrors([]);
      setSubmitted(false);
      history.push("/created-pins");
    }
  };

  useEffect(() => {
    const errors = [];
    if (!title.length) errors.push("Please enter a title for this Pin");
    if (!description.length) errors.push("Please enter a description");
    if (!imageUrl) errors.push("Please provide an image!");
    setErrors(errors);
  }, [title, description, imageUrl]);

  return (
    <div className='create-pin-form-wrapper'>
      <div className='create-pin-form-container'>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className='create-pin-form'>
        <div className='file-upload-div'>
        <input
    id="imageUrl"
    name="imageUrl"
    type="file"
    onChange={(e) => setImageUrl(e.target.files[0])}
    style={{ display: "none" }}
  />
  <label htmlFor="imageUrl" className="custom-file-upload">
  <i class="fa-solid fa-circle-arrow-up"></i>
    <div>Click to upload</div>
  </label>
        </div>
        <div className='input-fields-container'>
          <div className='inputs-box'>
        <input
          id="create-title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add your title"
          required
        />
        <textarea
          id="create-description"
          name="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell everyone what your Pin is about"
          required
        />
          </div>
        <button type="submit" className='submit-pin-button'>Create</button>
        </div>
      </form>
      </div>
    </div>
  );
}
