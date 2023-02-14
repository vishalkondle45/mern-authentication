import { Tabs } from "@mantine/core";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../store";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios
      .post("http://localhost:5000/api/logout")
      .catch((error) => console.log(error));
    dispatch(authActions.logout());
  };

  return (
    <div>
      <Tabs defaultValue="login" variant="pills" radius="xl" my={"xs"}>
        <Tabs.List position="right">
          <Tabs.Tab value="title" disabled mr={"auto"}>
            <h2>MERN - Authentication</h2>
          </Tabs.Tab>
          {isLoggedIn ? (
            <Tabs.Tab
              to="/"
              onClick={handleLogout}
              value="logout"
              component={Link}
            >
              Logout
            </Tabs.Tab>
          ) : (
            <>
              <Tabs.Tab to="/login" value="login" component={Link}>
                Login
              </Tabs.Tab>
              <Tabs.Tab to="/signup" value="signup" component={Link}>
                Signup
              </Tabs.Tab>
            </>
          )}
        </Tabs.List>

        <Tabs.Panel value="login" pt="xs">
          Login Content
        </Tabs.Panel>

        <Tabs.Panel value="signup" pt="xs">
          Signup content
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default Header;
