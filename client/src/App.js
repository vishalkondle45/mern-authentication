import { MantineProvider } from "@mantine/core";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <MantineProvider
      theme={{ fontFamily: "Fira Code" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Header />
    </MantineProvider>
  );
}

export default App;
