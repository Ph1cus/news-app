import {Container, Typography, Grid, Card, CardContent} from "@mui/material";
import AddNewsForm from "../Components/AddNewsForm";
function ProfileA (){
    return(
        <Container sx = {{mt:4, marginBottom: 4}}>
            <Typography variant="h4" gutterBottom sx={{textAlign: "center"}}>ПРОФІЛЬ АДміна</Typography>
            <Typography variant="body1" sx = {{textAlign: "justify"}}> Тут буде інфа про профіль Адміна</Typography>
            <Grid container spacing={4} sx ={{mt:2}}>
            </Grid>
            <AddNewsForm />
        </Container>
        
    )
}
export default ProfileA;