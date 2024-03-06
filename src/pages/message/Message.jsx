import React from "react";
import "./message.scss";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Message = () => {
  const { conversationId } = useParams();
  const queryClient = useQueryClient();

  const { user } = useContext(AuthContext);

  const { data, error, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      axios
        .get(
          import.meta.env.VITE_BASE_URL + "/api/messages/" + conversationId,
          { withCredentials: true }
        )
        .then((res) => {
          return res.data;
        }),
  });

  const mutation = useMutation({
    mutationFn: (messageData) =>
      axios.post(import.meta.env.VITE_BASE_URL + "/api/messages", messageData, {
        withCredentials: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["messges"]);
    },
  });

  if (isLoading) {
    return "looading";
  }

  if (error) {
    return "error";
  }

  console.log(data);
  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    mutation.mutate({ conversationId, desc });
    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <span className="nestedPosition">
          <Link to="/messages" className="link">
            Messages
          </Link>{" "}
          {">"} John Doe {">"}
        </span>
        <div className="messages">
          {data.map((message) => {
            return (
              <div
                className={user._id === message.userId ? "item owner" : "item"}
                key={message._id}
              >
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{message.desc}</p>
              </div>
            );
          })}
        </div>
        <hr />
        <div className="write">
          <form onSubmit={(e) => handleSubmit(e)}>
            <textarea placeholder="write a message" />
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Message;
