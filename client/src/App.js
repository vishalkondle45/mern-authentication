import { MantineProvider } from "@mantine/core";
import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <MantineProvider
      theme={{ fontFamily: "Fira Code" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Header />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {isLoggedIn && <Route path="/user" element={<Welcome />} />}
      </Routes>
    </MantineProvider>
  );
}

export default App;
