import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/navbar";
import { ReduxProvider } from "./config/reduxProvider";
import Initialize from "./config/initialize";
import Drive from "./pages/Drive";

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
            <Route path="/drive" element={<Drive />} />
          </Routes>
        </BrowserRouter>
      </Initialize>
    </ReduxProvider>
  );
}

export default App;
