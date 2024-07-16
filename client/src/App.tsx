import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home />} />
          {/* <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
