//import  "./style.css";
//import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Box, Typography, Container, Link, Button } from "@mui/material";
import AuthModal from "../AuthModel";
import { useEffect } from "react";
import { auth } from "/src/firebase"; 
import { onAuthStateChanged, getAuth, signOut  } from "firebase/auth";
import { Link as RouterLink} from 'react-router-dom';
import useAuthStore from '/src/Components/AuthStore'



const Header = () => {
  const [openAuth, setOpenAuth] = useState(false);
  const { user, setUser, clearUser } = useAuthStore(); // Отримуємо user та role з Zustand


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => { // <<< async тут!
      if (firebaseUser) {
        const token = await firebaseUser.getIdTokenResult(); // <<< тут правильний метод
        const role = token.claims.role || "user";
  
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          role: role
        });
      } else {
        clearUser();
      }
    });
  
    return () => unsubscribe();
  }, [setUser, clearUser]);
  

  const handleLogout = () => {
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
            position: "relative",
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
              
              <Box
                  sx={{ 
                  position: "absolute", // Виводить елемент за межі контейнера
                  left: 20, // Прикріплює його до правого краю екрану
                  top: "50%", // Вертикальне розташування (по центру)
                  transform: "translateY(-50%)", // Для точного центрування

                  }}> 
                    <Typography variant="h5">News</Typography>
                </Box>
    
              
              
              <Box component="nav" sx={{ display: "flex", gap: 2, flexGrow: 1, justifyContent: "center"}}> 
                <Link href="/" color="inherit" underline="hover">Home</Link>
                <Link href="/search" color="inherit" underline="hover">Пошук</Link>
                <Link href="/about" color="inherit" underline="hover">Про нас</Link>
              </Box> 
              
              

              
              {user  ? 
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


                <Box
                  sx={{
                  position: "absolute", // Виводить елемент за межі контейнера
                  right: 20, // Прикріплює його до правого краю екрану
                  top: "50%", // Вертикальне розташування (по центру)
                  transform: "translateY(-50%)", // Для точного центрування
                  zIndex: 10, // Щоб логотип був поверх інших елементів
                  }}>  
              <Button 
                component={RouterLink}
                to = {user?.role === "admin" ? "/profileA" : "/profileR"}
                sx={{
                bgcolor: "black", // Фон
                color: "white", // Колір тексту
                "&:hover": { bgcolor: "#333" }, // Ховер
                borderRadius: "20px", // Закруглення
                px: 1, // Горизонтальний паддінг
                
                 }}>
                Profile           
              </Button>

              </Box>
            </Box>
          </Container>
        </Box>
    );
};

export default Header;