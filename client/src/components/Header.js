import { Tabs } from "@mantine/core";
import React from "react";

const Header = () => {
  return (
    <div>
      <Tabs defaultValue="login" variant="pills" radius="xl" my={"xs"}>
        <Tabs.List position="right">
          <Tabs.Tab value="title" disabled mr={"auto"}>
            <h2>MERN - Authentication</h2>
          </Tabs.Tab>
          <Tabs.Tab value="login">Login</Tabs.Tab>
          <Tabs.Tab value="signup">Signup</Tabs.Tab>
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
