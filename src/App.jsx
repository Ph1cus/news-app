import { useState } from 'react'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import Footer from './Components/Footer'
import NewsDetailPage from './Pages/NewsDetailPage'
import {Box} from "@mui/material"


function App() {
  
  return (
    <Box
    display="flex"
    flexDirection="column"
     minHeight="100vh"
    >
      <BrowserRouter>
      <Header/>
      
      <Box component="main" flex = "1">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path= "/news/:id" element={<NewsDetailPage/>}/>
        </Routes>
      </Box>
        
      
      <Footer/>
      </BrowserRouter>
    </Box>
          
  
      
  )
}

export default App
