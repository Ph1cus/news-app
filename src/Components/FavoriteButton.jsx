import { useEffect, useState } from "react";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const FavoriteButton = ({ userId, newsId, newsTitle }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const favDocId = `${userId}_${newsId}`;

  useEffect(() => {
    const checkFavorite = async () => {
      const docRef = doc(db, "favorites", favDocId);
      const docSnap = await getDoc(docRef);
      setIsFavorite(docSnap.exists());
    };

    if (userId && newsId) {
      checkFavorite();
    }
  }, [userId, newsId]);

  const toggleFavorite = async () => {
    const docRef = doc(db, "favorites", favDocId);

    if (isFavorite) {
      await deleteDoc(docRef);
      setIsFavorite(false);
    } else {
      await setDoc(docRef, {
        userId,
        newsId,
        newsTitle,
        createdAt: new Date(),
      });
      setIsFavorite(true);
    }
  };

  return (
    <Tooltip title={isFavorite ? "Прибрати з обраного" : "Додати в обране"}>
      <IconButton
        onClick={toggleFavorite}
        color={isFavorite ? "error" : "default"}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default FavoriteButton;
