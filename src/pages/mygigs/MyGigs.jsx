import React from "react";
import "./mygigs.scss";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const MyGigs = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["mygigs"],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_BASE_URL + "api/gigs?userId=" + user._id)
        .then((res) => {
          return res.data;
        }),
  });

  const mutation = useMutation({
    mutationFn: (gigId) =>
      axios.delete(import.meta.env.VITE_BASE_URL + "api/gigs/" + gigId, {
        withCredentials: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["mygigs"]);
    },
  });

  const handleDelete = (gigId) => {
    mutation.mutate(gigId);
  };

  if (isLoading) {
    return "loading";
  }

  if (error) {
    return "error";
  }

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>Gigs</h1>
          <Link to="/add" className="link">
            <button>Add New Gig</button>
          </Link>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
          {data.map((gig) => {
            return (
              <tr key={gig._id}>
                <td>
                  <img className="img" src={gig.coverImg} />
                </td>
                <td>{gig.title}</td>
                <td>{gig.price}</td>
                <td>{gig.sales}</td>
                <td>
                  <img
                    className="delete"
                    src="/images/delete.png"
                    onClick={() => {
                      handleDelete(gig._id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default MyGigs;
