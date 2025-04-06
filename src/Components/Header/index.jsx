//import  "./style.css";
//import { Link } from "react-router-dom";
import { Box, Typography, Container, Link, Button } from "@mui/material";


const Header = () => {
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
              {/* Лого */}
              <Typography variant="h6" component="div">
                News
              </Typography>
    
              {/* Навігація (замість <nav> і <a>) */}
              
              <Box component="nav" sx={{ display: "flex", gap: 2}}>
                <Link href="/" color="inherit" underline="hover">Home</Link>
                <Link href="/search" color="inherit" underline="hover">Пошук</Link>
                <Link href="/about" color="inherit" underline="hover">Про нас</Link>
              </Box>
              <Button
              sx={{
                bgcolor: "red", // Фон
                color: "white", // Колір тексту
                "&:hover": { bgcolor: "#333" }, // Ховер
                borderRadius: "20px", // Закруглення
                px: 1, // Горизонтальний паддінг
                 }}>
                Login
              </Button>
            </Box>
          </Container>
        </Box>
    );
};

export default Header