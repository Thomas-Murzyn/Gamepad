import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/detail/:id"} element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
