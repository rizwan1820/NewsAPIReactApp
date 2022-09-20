import './App.css';
import React from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { useState } from 'react';


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'



function App() {

  const pageSize = 5;

  const [progress, setProgress] = useState(0)

  const SetProgress = () => {

    setProgress(progress);

  }
  return (
    <div>


      <BrowserRouter>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>

          <Route path="/" element={<News setProgress={SetProgress} key="general" pageSize={pageSize} country="in" category="general" />} />
          <Route path="/business" element={<News setProgress={SetProgress} key="business" pageSize={pageSize} country="in" category="business" />} />
          <Route path="/entertainment" element={<News setProgress={SetProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
          <Route path="/general" element={<News setProgress={SetProgress} key="general" pageSize={pageSize} country="in" category="general" />} />
          <Route path="/health" element={<News setProgress={SetProgress} key="health" pageSize={pageSize} country="in" category="health" />} />
          <Route path="/science" element={<News setProgress={SetProgress} key="science" pageSize={pageSize} country="in" category="science" />} />
          <Route path="/sports" element={<News setProgress={SetProgress} key="sports" pageSize={pageSize} country="in" category="sports" />} />
          <Route path="/technology" element={<News setProgress={SetProgress} key="technology " pageSize={pageSize} country="in" category="technology" />} />
        </Routes>
      </BrowserRouter>

    </div>
  )

}


export default App;
