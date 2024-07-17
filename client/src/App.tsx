import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/navbar";
import { ReduxProvider } from "./config/reduxProvider";
import Initialize from "./config/initialize";

function App() {
  return (
    <ReduxProvider>
      <Initialize>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </Initialize>
    </ReduxProvider>
  );
}

export default App;
