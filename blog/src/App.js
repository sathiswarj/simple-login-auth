import Register from "./Register";
import {  Route, Routes } from 'react-router-dom'
import Login from './Login'
import Home from "./Home";
import Blog from "./Blog";
 
function App() {
  return (
    <div className="App">
      
        <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/blog" exact element={<Blog />} />
        <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
        </Routes>
 
    </div>
  );
}

export default App;
