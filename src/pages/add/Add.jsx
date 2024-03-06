import React, { useState } from "react";
import "./add.scss";
import {
  INITIAL_STATE,
  createGigReducer,
} from "../../reducers/createGigReducer";
import { useReducer } from "react";
import { upload } from "../../utils/upload";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [state, dispatch] = useReducer(createGigReducer, INITIAL_STATE);
  const [coverImg, setCoverImg] = useState("");
  const [images, setImages] = useState("");

  const [uploadLoading, setUploadLoading] = useState(false);

  const [createLoading, setCreateLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const navigate = useNavigate();

  const handleUpload = async () => {
    setUploadLoading(true);
    try {
      const coverImageUrl = await upload(coverImg);

      const imagesURls = await Promise.all(
        [...images].map(async (image) => {
          const url = await upload(image);
          return url;
        })
      );

      dispatch({
        type: "ADD_IMAGES",
        payload: { coverImg: coverImageUrl, images: imagesURls },
      });
      setUploadLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_FEATURE", payload: e.target[0].value });
    e.target[0].value = "";
  };

  const mutation = useMutation({
    mutationFn: (state) =>
      axios.post(import.meta.env.VITE_BASE_URL + "/api/gigs", state, {
        withCredentials: true,
      }),
    onSuccess: () => {
      setCreateLoading(false);
      navigate("/mygigs");
    },
    onError: (err) => {
      setError(err.response.data.message);
      setCreateLoading(false);
    },
  });

  const createGig = () => {
    setCreateLoading(true);
    mutation.mutate(state);
  };

  console.log(state);

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="I will do something i am grat at"
              name="title"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={(e) => handleChange(e)}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animmation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="imagesContainer">
              <div className="imageInputs">
                <label htmlFor="">CoverImg</label>
                <input
                  type="file"
                  name="coverImg"
                  onChange={(e) => {
                    setCoverImg(e.target.files[0]);
                  }}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  name="images"
                  onChange={(e) => setImages(e.target.files)}
                />
              </div>
              <button
                disabled={uploadLoading}
                onClick={(e) => {
                  handleUpload(e);
                }}
              >
                {uploadLoading ? "Uploading" : "Upload Images"}
              </button>
              <span className="important">
                Important Note (Dont forget to upload images before creating a
                gig!)
              </span>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              placeholder="Brief description about the service you provide"
              name="desc"
              onChange={(e) => handleChange(e)}
            />
            <button
              className="createButton"
              disabled={createLoading}
              onClick={(e) => {
                createGig(e);
              }}
            >
              {createLoading ? "Creating Gig" : "Create"}
            </button>
            {error && <span className="error">{error}</span>}
          </div>
          <div className="right">
            <label htmlFor="">Short Title</label>
            <input
              type="text"
              placeholder="One page web design"
              name="shortTitle"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              placeholder="Short description regarding your gig"
              name="shortDesc"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="">Delivery Time(e.g. 3 days</label>
            <input
              type="number"
              min={1}
              placeholder="5"
              name="deliveryTime"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="">Revision Number</label>
            <input
              typeof="number"
              min={1}
              placeholder="3"
              name="revisionNumber"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="">Add Features</label>
            <form
              className="form"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <input type="text" placeholder="page design" />
              <button className="add">Add</button>
            </form>
            <div className="featuresOfGig">
              {state.features.map((feature) => {
                return (
                  <button
                    className="feature"
                    onClick={(e) =>
                      dispatch({ type: "REMOVE_FEATURE", payload: feature })
                    }
                  >
                    {feature} x{" "}
                  </button>
                );
              })}
            </div>
            <label htmlFor="">Price</label>
            <input
              type="number"
              min={1}
              placeholder="50"
              name="price"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
