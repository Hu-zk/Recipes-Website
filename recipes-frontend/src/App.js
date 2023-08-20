import React from 'react';
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Authentication from './pages/Authentication';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='' element={<Authentication/>}></Route>
      {/* <Route path='landing' element={<Home/>}></Route> */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
