import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "/Programs/reactapp/news-portal/src/firebase";
import { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";

function NewsDetailPage() {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);

    useEffect(() => {
        const fetchFullNews = async () => {
            const docRef = doc(db, "news", id);
            console.log(id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setNewsItem(docSnap.data());
                console.log(docSnap.exists())
            } else {
                console.log("Такої новини не знайдено");
            }
        };

        fetchFullNews();
    }, [id]);

    if (!newsItem) return <p>Завантаження...</p>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{textAlign: "center", marginTop : 3}}>{newsItem.title}</Typography>
            <Typography variant="body1" sx={{marginBottom: 2}}> <b>Автор:</b> {newsItem.author}</Typography>
            <Typography variant="body1" sx={{marginBottom: 2}}> <b>Дата:</b> {newsItem.date}</Typography> 
            
            <Typography variant="body2" sx={{textAlign: "justify"}}>{newsItem.fullContent}</Typography>
            
            <Button 
                component={Link} 
                to={"/"}
                variant="contained"
                
                sx={{ mt: 2, marginBottom: 4}}
                >
                Головна
            </Button>
        </Container>
        
    );
}

export default NewsDetailPage;
