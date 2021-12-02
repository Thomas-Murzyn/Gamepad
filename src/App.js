import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/detail/:id"} element={<Detail />} />
        <Route path={"/search/:title"} element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
