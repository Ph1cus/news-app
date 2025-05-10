import { Box, Typography, Container, Link } from "@mui/material";

const Footer = () => {
    return (
        <Box 
          component="footer" 
          sx={{ 
            py: 3, 
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
              {/* Лого */}
              <Typography variant="h6" component="div">
                News
              </Typography>
    
              
              
              <Box component="nav" sx={{ display: "flex", gap: 2 }}>
                <Link href="/" color="inherit" underline="hover">Home</Link>
                <Link href="/about" color="inherit" underline="hover">Про нас</Link>
              </Box>
            </Box>
          </Container>
        </Box>
      );
    };

export default Footer