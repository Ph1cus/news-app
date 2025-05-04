import {Container, Typography, Grid, Box} from "@mui/material";
import AddNewsForm from "../Components/AddNewsForm";
function ProfileA (){
    return(
        <Container sx = {{mt:4, marginBottom: 4}}>
            <Typography variant="h4" gutterBottom sx={{textAlign: "left"}}>Форма додавання новини</Typography>
            <Typography variant="body1" sx = {{textAlign: "justify"}}>Заповніть поля нижче :</Typography>
            <Grid container spacing={4} sx ={{mt:2}}>
            </Grid>
            <Box sx={{mr: 25, ml: 10}}>
                <AddNewsForm />
            </Box>
            
        </Container>
        
    )
}
export default ProfileA;