import Author from "./Author";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import useAuthStore from "../Components/AuthStore";
import {doc, deleteDoc } from "firebase/firestore"
import { db } from "/src/firebase";
import FavoriteButton from "./FavoriteButton";



function NewsCard({id, title, desc, date, author, onDelete  }){
    const {user} = useAuthStore();
    const handleDelete = async () => {
        try {
          await deleteDoc(doc(db, "news", id));
          onDelete?.(id); 
        } catch (err) {
          console.error("Помилка при видаленні новини:", err.message);
        }
      };
    return (
        <div className="newsCard">
            
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>{title}</h3>
            {user && (
              <FavoriteButton 
                userId={user.uid} 
                newsId={id} 
                newsTitle={title} 
              />
            )}
          </Box>
            <p>{desc}</p>
            <small>{date}</small>
            <Author nickname={author}/>
          <Box  sx={{display: "flex", gap: 10, alignItems: "center", mt: 2}}>  
            <Button 
                component={Link} 
                to={`/news/${id}`} 
                variant="contained"
                sx={{ height: 40, minWidth: 100}}
                
            >
        Детальніше
      </Button>
      {user?.role === "admin" && (
        <Button variant="contained"
        onClick={handleDelete} 
        color="error"
        size="small"
        sx={{height: 40, minWidth: 100}}
        >
            Delete
        </Button>
      )}
      </Box>
        </div>
    )
    
}

export default NewsCard;