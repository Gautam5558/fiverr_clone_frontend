import React, { useContext } from "react";
import "./messsages.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
const Messages = () => {
  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_BASE_URL + "/api/conversations", {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        }),
  });

  const mutation = useMutation({
    mutationFn: (id) =>
      axios.put(
        import.meta.env.VITE_BASE_URL + "/api/conversations/" + id,
        { id },
        { withCredentials: true }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleClick = (id) => {
    mutation.mutate(id);
  };

  if (isLoading) {
    return "loading...";
  }

  if (error) {
    return "There was some error";
  }

  console.log(data);

  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        <table>
          <tr>
            <th>{user.isSeller ? "Buyer" : "Seller"}</th>
            <th>Last Messages</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          {data.map((conversation) => {
            return (
              <tr
                className={
                  user.isSeller
                    ? conversation.readBySeller
                      ? ""
                      : "active"
                    : conversation.readByBuyer
                    ? ""
                    : "active"
                }
                key={conversation._id}
              >
                <td>
                  {user.isSeller
                    ? conversation.buyerId.substring(0, 30)
                    : conversation.sellerId.substring(0, 30)}
                </td>
                <td>
                  <Link to={"/message/" + conversation.id} className="link">
                    {conversation.lastMessage?.substring(0, 100) || "......."}
                    ...
                  </Link>
                </td>
                <td>{moment(data.updatedAt).fromNow()}</td>
                <td>
                  {user.isSeller ? (
                    conversation.readBySeller ? (
                      ""
                    ) : (
                      <button onClick={() => handleClick(conversation._id)}>
                        Mark as Read
                      </button>
                    )
                  ) : conversation.readByBuyer ? (
                    ""
                  ) : (
                    <button onClick={() => handleClick(conversation._id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Messages;
