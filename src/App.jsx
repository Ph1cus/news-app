import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import Footer from './Components/Footer'
import NewsDetailPage from './Pages/NewsDetailPage'
import ProfileR from './Pages/ProfileR'
import ProfileA from './Pages/profileA'
import useAuth from './hooks/useAuth'
import {Box} from "@mui/material"
import ErrorBoundary from './Components/ErrorBoundary'


function App() {
  useAuth();
  return (
    <ErrorBoundary>
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
          <Route path= "/profileR" element={<ProfileR/>}/>
          <Route path= "/profileA" element={<ProfileA/>}/>
        </Routes>
      </Box>
        
      
      <Footer/>
      </BrowserRouter>
    </Box>
    </ErrorBoundary>
  
      
  )
}

export default App
