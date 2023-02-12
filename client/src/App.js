import { MantineProvider } from "@mantine/core";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Welcome from "./components/Welcome";

function App() {
  return (
    <MantineProvider
      theme={{ fontFamily: "Fira Code" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Router>
        <Header />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<Welcome />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
