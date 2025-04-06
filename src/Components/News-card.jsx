import Author from "./Author";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function NewsCard({id, title, desc, date, author }){
    return (
        <div className="newsCard">
            
            <h3>{title}</h3>
            <p>{desc}</p>
            <small>{date}</small>
            <Author nickname={author}/>
            <Button 
                component={Link} 
                to={`/news/${id}`} 
                variant="contained"
                sx={{ mt: 2}}
                
            >
        Детальніше
      </Button>
      
        </div>
    )
    
}

export default NewsCard;