import React from "react";
import "./becomeseller.scss";
import { communityData } from "../../utils/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import {
  faDollarSign,
  faHeart,
  faCheck,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Messages from "../messages/Messages";

const BecomeSeller = () => {
  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState(null);

  const handleClick = (e) => {
    setOpen((previous) => {
      return !previous;
    });
  };

  const navigate = useNavigate();

  const { user, dispatch } = useContext(AuthContext);

  const mutationClearCoookie = useMutation({
    mutationFn: (val) =>
      axios.post(import.meta.env.VITE_BASE_URL + "/api/auth/logout", val, {
        withCredentials: true,
      }),
    onSuccess: () => {
      dispatch({ type: "LOGOUT" });
      navigate("/login?message=You can now login as seller");
    },
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      axios.put(import.meta.env.VITE_BASE_URL + "/api/users", data, {
        withCredentials: true,
      }),

    onSuccess: () => {
      mutationClearCoookie.mutate({ userId: user._id });
    },
  });

  const becomeSeller = (e) => {
    if (user) {
      mutation.mutate({ userId: user._id });
    } else {
      setMessage(
        "You're not logged in. To become a seller either create a new account or signup using the account you have"
      );
    }
  };

  return (
    <div className="becomeaseller">
      <div className="hero">
        <video
          src="/images/cover_video.mp4"
          className="video"
          autoPlay
          preload="auto"
          muted
        />
        <div className="videoCentre">
          <h1>Work Your Way</h1>
          <h3>You bring the skill. We'll make earning easy.</h3>
          <button
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Become a Seller
          </button>
        </div>
        <ul>
          <li>
            A Gig is Bought Every
            <br />
            <span>4 Sec</span>
          </li>
          <li>
            Transactions
            <br />
            <span>50M+</span>
          </li>
          <li>
            Price Range
            <br />
            <span>$5 - $10,000</span>
          </li>
        </ul>
      </div>
      <h2>Join our growing Freelance Community</h2>
      <div className="container">
        <div className="community">
          {communityData.map((item) => {
            return (
              <div className="card" key={item.occupation}>
                <img src={item.img} />
                <h2>
                  I am a <br />
                  {item.occupation}
                </h2>
              </div>
            );
          })}
          <div className="card">
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: "red", fontSize: "30px" }}
            />
            <span>Whats's Your Skill?</span>
            <button
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Become a Seller
            </button>
          </div>
        </div>
        <div className="working">
          <h2>How it Works</h2>
          <div className="items">
            <div className="item">
              <FontAwesomeIcon icon={faFileLines} className="icon" />
              <span className="title">1. Create a Gig</span>
              <span className="desc">
                Sign up for free, set up your Gig, and offer your work to our
                global audience.
              </span>
            </div>
            <div className="item">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <span className="title">2. Deliver great work</span>
              <span className="desc">
                Get notified when you get an order and use our system to discuss
                details with customers.
              </span>
            </div>
            <div className="item">
              <FontAwesomeIcon icon={faDollarSign} className="icon" />
              <span className="title">3.Get paid</span>
              <span className="desc">
                Get paid on time, every time. Payment is available for
                withdrawal as soon as it clears.
              </span>
            </div>
          </div>
        </div>
        <div className="bottom">
          <span>Create your first Gig today</span>
          <button
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Get Started
          </button>
        </div>
      </div>
      {open && (
        <div className="popup">
          <div className="content">
            <span
              className="close"
              onClick={(e) => {
                setOpen(false);
              }}
            >
              x
            </span>
            <div className="left">
              <ul>
                <li>
                  <FontAwesomeIcon icon={faStar} />
                  <span className="instructions">
                    Disclaimer(Read the following instructions carefully before
                    confirming to become a seller)
                  </span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  To become a seller using the this account, your account would
                  no longer support buyer functionalities.
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  Data regarding buyer will not displayed on your interface.
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  Only seller info will be displayed.
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  You would not be able to continue as a buyer from current
                  account. For that you would have to create a new account.
                </li>
              </ul>
            </div>
            <div className="right">
              <span>
                Click on the below button to confirm becoming a seller
              </span>
              <button
                className="seller"
                onClick={(e) => {
                  becomeSeller(e);
                }}
              >
                Confirm
              </button>
              {message && <span className="message">({message})</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BecomeSeller;
