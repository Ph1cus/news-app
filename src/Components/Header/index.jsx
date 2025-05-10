import React, { useState } from "react";
import { Box, Typography, Container, Link, Button, TextField } from "@mui/material";
import AuthModal from "../AuthModel";
import { useEffect } from "react";
import { auth } from "/src/firebase"; 
import { onAuthStateChanged, getAuth, signOut  } from "firebase/auth";
import { Link as RouterLink} from 'react-router-dom';
import useAuthStore from '/src/Components/AuthStore'



const Header = () => {
  const [openAuth, setOpenAuth] = useState(false);
  const { user, setUser, clearUser, searchQuery, setSearchQuery } = useAuthStore(); 


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => { 
      if (firebaseUser) {
        const token = await firebaseUser.getIdTokenResult(); 
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
        alert("Вихід успішний");
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
            color: "white"
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
                  position: "absolute", 
                  left: 20, 
                  top: "50%", 
                  transform: "translateY(-50%)", 

                  }}> 
                    <Typography variant="h5">News</Typography>
                </Box>
    
              
              
              <Box component="nav" sx={{ 
                display: "flex", 
                gap: 2, 
                flexGrow: 1, 
                justifyContent: "center", 
                alignItems:"center"}}> 
                <Link href="/" color="inherit" underline="hover">Home</Link>
                <Link href="/about" color="inherit" underline="hover">Про нас</Link>

                <TextField
                placeholder="Пошук новини"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ backgroundColor: "white", borderRadius: 1, ml: 2, minWidth: 200}}
              />
              </Box> 
              
              

              
              {user  ? 
              (<Button onClick={handleLogout}
              sx={{
                bgcolor: "red",
                color: "white", 
                "&:hover": { bgcolor: "#333" },
                borderRadius: "20px", 
                px: 1, 
                 }}>
                Logout
              </Button>):
              (<Button onClick={() => setOpenAuth(true)}
              sx={{
                bgcolor: "green", 
                color: "white", 
                "&:hover": { bgcolor: "#333" }, 
                borderRadius: "20px", 
                px: 1, 
                 }}>
                Login           
              </Button>)
              }
              <AuthModal open={openAuth} onClose={() => setOpenAuth(false)} />


                <Box
                  sx={{
                  position: "absolute", 
                  right: 20, 
                  top: "50%", 
                  transform: "translateY(-50%)", 
                  zIndex: 10, 
                  }}>  
              <Button 
                component={RouterLink}
                to =  {"/profileR"}
                sx={{
                bgcolor: "black", 
                color: "white", 
                "&:hover": { bgcolor: "#333" }, 
                borderRadius: "20px", 
                px: 1, 
                
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