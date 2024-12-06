import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./Components/Search";
import SearchRes from "./Components/SearchRes";
import Weather from "./Components/Weather";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/search/:country" element={<SearchRes />} />
        <Route path="/search/:country/:lat/:lon" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
}
