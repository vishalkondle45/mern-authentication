import axios from "axios";
import React, { useEffect, useState } from "react";
axios.defaults.withCredentials = true;

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

  useEffect(() => {
    getUser().then((res) => setUser(res.user));
  }, []);

  return <div>{user && <h1>Welcome {user.name}</h1>}</div>;
};

export default Welcome;
