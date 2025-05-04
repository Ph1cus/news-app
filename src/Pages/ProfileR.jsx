import {Container, Typography, Avatar,  Box, Button, TextField} from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "/src/firebase";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import useAuthStore from "../Components/AuthStore";
import { Link } from "react-router-dom";



function ProfileR (){
    const auth = getAuth();
    const uid = auth.currentUser?.uid;

const [userProfile, setUserProfile] = useState(null);
const [loading, setLoading] = useState(true);
const [notFound, setNotFound] = useState(false);
const [isEditingName, setIsEditingName] = useState(false);
const [isEditingBio, setIsEditingBio] = useState(false);
const [editedName, setEditedName] = useState(userProfile?.name || '');
const [editedBio, setEditedBio] = useState(userProfile?.bio || '');
const {user} = useAuthStore();





    useEffect(() => {
        const fetchUserProfile = async () => {
          setLoading(true);
          setNotFound(false);
      
          try {
            const docRef = doc(db, "users", uid); 
            const docSnap = await getDoc(docRef);
      
            if (docSnap.exists()) {
              setUserProfile(docSnap.data());
            } else {
              setNotFound(true);
            }
          } catch (error) {
            setNotFound(true);
          } finally {
            setLoading(false);
          }
        };
      
        fetchUserProfile();
      }, [uid]);
      if (loading) return <Typography variant="h6">Завантаення.......   .</Typography>
      if (notFound) return <Typography variant="h6">Пу пу пуууу</Typography>

      const handleSaveName = async () => {
        try {
          const userRef = doc(db, "users", uid);  
          await updateDoc(userRef, { name: editedName });  
          setUserProfile((prev) => ({ ...prev, name: editedName }));  
          setIsEditingName(false);  
        } catch (error) {
          console.error("Помилка при збереженні імені:", error);
        }
      };

      


      const handleSaveBio = async () => {
        try {
          const userRef = doc(db, "users", uid);  
          await updateDoc(userRef, { bio: editedBio });  
          setUserProfile((prev) => ({ ...prev, bio: editedBio }));  
          setIsEditingBio(false);  
        } catch (error) {
          console.error("Помилка при збереженні біо:", error);
        }
      };
      





    return(
        <Container>
            <Box  sx={{display : "flex", gap: 4, alignItems:"center", justifyContent: "left", mb: 6}}>
                <Avatar src="/img/img1.jpg"
                sx={{
                    width: { xs: 60, sm: 80, md: 100 }, 
                    height: { xs: 60, sm: 80, md: 100 }, 
                    boxShadow: 4, 
                  }} />
                

                {isEditingName ? (
                <>
                <TextField
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                size="small"
                />
                <Button variant="contained" onClick={handleSaveName}>Save</Button>
                <Button variant="contained" onClick={() => setIsEditingName(false)}>Cancel</Button>
                </>
                ) : (
                <>
                <Typography variant="h4">{userProfile.name}</Typography>
                <Button size="small" variant="contained" onClick={() => {
                  setEditedName(userProfile.name);
                  setIsEditingName(true)}}>Edit</Button>
                </>
                )}
                </Box>
            <Box>
            {isEditingBio ? (
                <>
                <TextField
                    multiline
                    fullWidth
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                    rows={4}
                    sx={{ mb: 2 }}
                />
                <Box sx={{display : "flex", gap: 3}}>
                <Button variant="contained" onClick={handleSaveBio}>Save</Button>
                <Button variant="contained" onClick={() => setIsEditingBio(false)}>Cancel</Button>
                </Box>

                </>
            ) : (
                <>
                <Typography variant="body2" sx={{textAlign:"justify"}} >{userProfile.bio}</Typography>
                <Button size="small" variant="contained" sx={{mt:4}} onClick={() => {
                  setEditedBio(userProfile.bio);
                  setIsEditingBio(true);
                }}>Edit</Button>
                </>
            )}
            </Box>
            <Box sx={{mt: 5}}>
            {user?.role === "admin" && (
                
                <Button 
                component ={Link}
                to={"/profileA"}
                variant="contained" 
                >
                    кнопка для адміна
                </Button>
            )}
            </Box>
           
            
        </Container>
        
        
    )
}
export default ProfileR;