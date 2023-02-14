import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";
axios.defaults.withCredentials = true;
let firstRender = true;

const Welcome = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [user, setUser] = useState();
  const getUser = async () => {
    const { data } = await axios
      .get("http://localhost:5000/api/user", {
        withCredentials: true,
      })
      .catch((error) => {
        console.log(error);
        dispatch(authActions.logout());
      });
    return data;
  };

  const refresh = async () => {
    const { data } = await axios
      .get("http://localhost:5000/api/refresh", {
        withCredentials: true,
      })
      .catch((error) => {
        console.log(error);
        dispatch(authActions.logout());
        history("/login");
      });
    return data;
  };

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      getUser().then((res) => setUser(res.user));
    }

    let interval = setInterval(() => {
      refresh().then((res) => setUser(res.user));
    }, 1000 * 28);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return <div>{user && <h1>Welcome {user.name}</h1>}</div>;
};

export default Welcome;
