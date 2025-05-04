import Author from "./Author";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import useAuthStore from "../Components/AuthStore";
import {doc, deleteDoc } from "firebase/firestore"
import { db } from "/src/firebase";



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
            
            <h3>{title}</h3>
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