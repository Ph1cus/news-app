import {Container, Typography, Avatar,  Box, Button, TextField, Card, CardContent} from "@mui/material";
import { doc, getDoc, updateDoc, query, where, collection , getDocs, deleteDoc} from "firebase/firestore";
import { db } from "/src/firebase";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import useAuthStore from "../Components/AuthStore";
import { Link } from "react-router-dom";
import EditableField from "../Components/EditableFields";

function ProfileR (){
    const auth = getAuth();
    const uid = auth.currentUser?.uid;

const [userProfile, setUserProfile] = useState(null);
const [loading, setLoading] = useState(true);
const [notFound, setNotFound] = useState(false);
const {user} = useAuthStore();
const [favorites, setFavorites] = useState([]);


const handleRemoveFavorite = async (favoriteId) => {
    await deleteDoc(doc(db, "favorites", favoriteId));
    setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteId));}

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

        const fetchFavorites = async () => {
          if (!uid) return;
      
          try {
            const q = query(
              collection(db, "favorites"),
              where("userId", "==", uid)
            );
            const querySnapshot = await getDocs(q);
            const favs = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setFavorites(favs);
          } catch (error) {
            console.error("Помилка при завантаженні обраного:", error);
          }
        };
      
        fetchFavorites();
      


      }, [uid]);


      if (loading) return <Typography variant="h6">Завантаення.......   .</Typography>
      if (notFound) return <Typography variant="h6">Пу пу пуууу</Typography>

    return(
      <Box sx={{ maxWidth: "1400px", mx: "auto", px: 2, mt: 4 }}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>

        {/* Ліва колонка */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ p: 3, mb: 4 }}>
            <CardContent>
              <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
                <Avatar
                  src="/img/img1.jpg"
                  sx={{
                    width: { xs: 60, sm: 80, md: 100 },
                    height: { xs: 60, sm: 80, md: 100 },
                    boxShadow: 4,
                  }}
                />
                <EditableField
                  value={userProfile.name}
                  label="Ім’я"
                  onSave={async (newName) => {
                    const userRef = doc(db, "users", uid);
                    await updateDoc(userRef, { name: newName });
                    setUserProfile((prev) => ({ ...prev, name: newName }));
                  }}
                  textVariant="h4"
                />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ p: 3 }}>
            <EditableField
              value={userProfile.bio}
              label="Біографія"
              onSave={async (newBio) => {
                const userRef = doc(db, "users", uid);
                await updateDoc(userRef, { bio: newBio });
                setUserProfile((prev) => ({ ...prev, bio: newBio }));
              }}
              multiline
            />
          {/* Кнопка для адміна */}
          {user?.role === "admin" && (
            <Box sx={{ mt: 4 }}>
              <Button component={Link} to="/profileA" variant="contained">
                Кнопка для адміна
              </Button>
            </Box>
          )}
        
          </Card>
</Box>

        {/* Права колонка: Обрані */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ p: 3, height: "91%" }}>
          <Typography variant="h4" gutterBottom>
            <b>Обрані</b>
          </Typography>

{favorites.length > 0 ? (
  favorites.map((fav) => (
    <Box
      key={fav.id}
      sx={{
        display: "flex",
        
        alignItems: "center",
        mb: 2,
        p: 1,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography sx={{ flex: 1 }}>{fav.newsTitle}</Typography>
      <Box sx={{ mx: "auto" }}>
      <Button
        onClick={() => handleRemoveFavorite(fav.id)}
        variant="contained"
        size="small"
      >
          Видалити з обраних
      </Button>
    </Box>

      <Button
        component={Link}
        to={`/news/${fav.newsId}`}
        variant="contained"
        size="small"
        sx={{ ml: 2}}
      >
                Перейти
              </Button>
            </Box>
          ))
        ) : (
          <Typography>Немає обраних новин.</Typography>
        )}

          </Card>
        </Box>
      </Box>
    </Box>


        
        
    )
}
export default ProfileR;