import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "/Programs/reactapp/news-portal/src/firebase";
import { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";

function NewsDetailPage() {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchFullNews = async () => {
        setLoading (true);
        setNotFound(false);

        try{
            const docRef = doc(db, "news", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setNewsItem(docSnap.data());
                
            } else {
                setNotFound(true);
            }
            } catch (error) {
                
                setNotFound(true)
            } finally {
                setLoading(false);
            }

        };
            
        fetchFullNews();
    }, [id]);

    if (loading) return <Typography variant="h6">Завантаення.......   .</Typography>
    if (notFound) return <Typography variant="h6">Пу пу пуууу</Typography>

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
