//import  "./style.css";
//import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Box, Typography, Container, Link, Button } from "@mui/material";
import AuthModal from "../AuthModel";
import { useEffect } from "react";
import { auth } from "/src/firebase"; 
import { onAuthStateChanged, getAuth, signOut  } from "firebase/auth";



const Header = () => {
  const [openAuth, setOpenAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); 
    });
  
    return () => unsubscribe(); 
  }, []);

    const handleLogout = () => {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("Вихід успішний");
        })
        .catch((error) => {
          console.error("Помилка при виході:", error.message);
        });
    };
  
    return (
      
        <Box 
          component="header" 
          sx={{ 
            py: 1, 
            backgroundColor: "primary.main", 
            color: "white",
            
          }}
        >
          <Container maxWidth="lg">
            <Box 
              sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center" 
              }}
            >
              
              <Typography variant="h6" component="div">
                News
              </Typography>
    
              
              
              <Box component="nav" sx={{ display: "flex", gap: 2}}>
                <Link href="/" color="inherit" underline="hover">Home</Link>
                <Link href="/search" color="inherit" underline="hover">Пошук</Link>
                <Link href="/about" color="inherit" underline="hover">Про нас</Link>
              </Box>
              {currentUser ? 
              (<Button onClick={handleLogout}
              sx={{
                bgcolor: "red", // Фон
                color: "white", // Колір тексту
                "&:hover": { bgcolor: "#333" }, // Ховер
                borderRadius: "20px", // Закруглення
                px: 1, // Горизонтальний паддінг
                 }}>
                Logout
              </Button>):
              (<Button onClick={() => setOpenAuth(true)}
              sx={{
                bgcolor: "green", // Фон
                color: "white", // Колір тексту
                "&:hover": { bgcolor: "#333" }, // Ховер
                borderRadius: "20px", // Закруглення
                px: 1, // Горизонтальний паддінг
                 }}>
                Login           
              </Button>)
              }
              
              
              <AuthModal open={openAuth} onClose={() => setOpenAuth(false)} />
            </Box>
          </Container>
        </Box>
    );
};

export default Header;