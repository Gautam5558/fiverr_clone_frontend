import React from "react";
import "./gig.scss";
import { Slider } from "infinite-react-carousel";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Reviews from "../../components/reviews/Reviews";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";

const Gig = () => {
  const { gigId } = useParams();
  const [paymenterror, setPaymentError] = useState(null);
  const [contactError, setContactError] = useState(null);

  const navigate = useNavigate();
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: [`${gigId}`],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_BASE_URL + "/api/gigs/single/" + gigId)
        .then((res) => {
          return res.data;
        }),
  });

  const userId = data?.userId;

  const {
    isLoading: loadingUser,
    error: userError,
    data: userData,
  } = useQuery({
    queryKey: [`${data?.userId}`],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_BASE_URL + "/api/users/" + userId)
        .then((res) => {
          return res.data;
        }),
    enabled: !!userId,
  });

  if (isLoading) {
    return "Loading";
  }

  if (error) {
    return "There was some error";
  }

  if (loadingUser) {
    return "Loading";
  }

  if (userError) {
    return "There was some error";
  }

  const { user } = useContext(AuthContext);
  const handleClick = (e) => {
    if (user._id) {
      if (user.isSeller) {
        setPaymentError(
          "You cannot buy the gig as you are registered as a seller"
        );
      } else {
        navigate("/pay/" + gigId);
      }
    } else {
      setPaymentError("You cannot buy the gig as you are't logged in");
    }
  };

  const handleContact = async (sellerId, buyer) => {
    if (buyer._id) {
      if (buyer.isSeller) {
        setContactError(
          "You cannot contact the seller as you yourself are a seller"
        );
      } else {
        const buyerId = buyer._id;
        //conversation logic same as message icon in orders page
        try {
          const { data } = await axios.get(
            import.meta.env.VITE_BASE_URL +
              "/api/conversations/single/" +
              sellerId +
              buyerId,
            { withCredentials: true }
          );
          navigate("/message/" + sellerId + buyerId);
        } catch (err) {
          if (err.response.status === 402) {
            try {
              await axios.post(
                import.meta.env.VITE_BASE_URL + "/api/conversations",
                { to: user.isSeller ? buyerId : sellerId },
                { withCredentials: true }
              );
              navigate("/message/" + sellerId + buyerId);
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
    } else {
      setContactError("You have to signup/login first to contact the seller");
    }
  };

  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="nestedPosition">
            FIVERR {">"} GRAPHICS & DESIGN {">"}
          </span>
          <h1>{data.title}</h1>
          <div className="user">
            <img className="pp" src={userData.img || "/images/noavatar.jpg"} />
            <span>{userData.username}</span>
            <div className="stars">
              {data.totalStars != 0 &&
                Array(Math.round(data.totalStars / data.starNumber))
                  .fill()
                  .map((item, index) => {
                    return <img src="/images/star.png" key={index} />;
                  })}
              <span>
                {data.totalStars != 0 &&
                  Math.round(data.totalStars / data.starNumber)}
              </span>
            </div>
          </div>
          <Slider slidesToShow={1} className="slider">
            {data.images.map((item) => {
              return <img src={item} key={item} />;
            })}
          </Slider>
          <h2>About the Gig</h2>
          <p>{data.desc}</p>
          <div className="seller">
            <h2>About The Seller</h2>
            <div className="information">
              <img src={userData.img || "/images/noavatar.jpg"} />
              <div className="data">
                <span>{userData.username}</span>
                <div className="stars">
                  {data.totalStars != 0 &&
                    Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, index) => {
                        return <img src="/images/star.png" key={index} />;
                      })}
                  <span>
                    {data.totalStars != 0 &&
                      Math.round(data.totalStars / data.starNumber)}
                  </span>
                </div>
                <button onClick={(e) => handleContact(data.userId, user)}>
                  Contact Me
                </button>
              </div>
            </div>
            {contactError && (
              <span className="ContactError">{contactError}</span>
            )}
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{userData.country}</span>
                </div>
                <div className="item">
                  <span className="title">Member Since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Average Response Time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last Delivery</span>
                  <span className="desc">1 day ago</span>
                </div>
                <div className="item">
                  <span className="title">Language</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>{userData.desc}</p>
            </div>
          </div>
          <Reviews gigId={gigId} />
        </div>
        <div className="right">
          <div className="box">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/images/clock.png" />
                <span>{data.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/images/recycle.png" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="featuresOfService">
              {data.features.map((item) => {
                return (
                  <div className="feature" key={item}>
                    <img src="/images/greencheck.png" />
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
            <button onClick={(e) => handleClick(e)}>Continue</button>
            {paymenterror && <span className="error">{paymenterror}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gig;
