import axios from "axios";
import React, { useEffect, useState } from "react";
axios.defaults.withCredentials = true;
let firstRender = true;

const Welcome = () => {
  const [user, setUser] = useState();
  const getUser = async () => {
    const { data } = await axios
      .get("http://localhost:5000/api/user", {
        withCredentials: true,
      })
      .catch((error) => console.log(error));
    return data;
  };

  const refresh = async () => {
    const { data } = await axios
      .get("http://localhost:5000/api/refresh", {
        withCredentials: true,
      })
      .catch((error) => console.log(error));
    return data;
  };

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      getUser().then((res) => setUser(res.user));
    }

    let interval = setInterval(() => {
      refresh().then((res) => setUser(res.user));
    }, 1000 * 29);

    return () => clearInterval(interval);
  }, []);

  return <div>{user && <h1>Welcome {user.name}</h1>}</div>;
};

export default Welcome;
