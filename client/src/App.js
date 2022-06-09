import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/home";
import Landing from "./components/landing";
import Detail from "./components/countryDetail";
import Creation from "./components/createActivity";

function App() {
  return (
    <div className='App'>
      <div>
        <Routes>
          <Route exact path="/" element={<Landing/>}/>
          <Route exact path="/countries" element={<Home/>}/>
          <Route path="/countries/:id" element={<Detail/>}/>
          <Route exact path="/create" element={<Creation/>}/>
        </Routes>
      </div>
    </div>
      
  );
}

export default App;
