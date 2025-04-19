import {Container, Typography, Grid, Card, CardContent} from "@mui/material";
function ProfileR (){
    return(
        <Container sx = {{mt:4, marginBottom: 4}}>
            <Typography variant="h4" gutterBottom sx={{textAlign: "center"}}>ПРОФІЛЬ</Typography>
            <Typography variant="body1" sx = {{textAlign: "justify"}}> Тут буде інфа про профіль</Typography>
            <Grid container spacing={4} sx ={{mt:2}}>
            </Grid>
        </Container>
        
    )
}
export default ProfileR;