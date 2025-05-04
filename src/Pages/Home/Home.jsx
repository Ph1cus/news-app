import NewsCard from "../../Components/News-card";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import './Home.css'
import useAuthStore from "../../Components/AuthStore";



function Home(){
const [news, setNews] = useState([]);
const { searchQuery} = useAuthStore();

const handleNewsDelete = async (idToDelete) => {
  try {
    await deleteDoc(doc(db, "news", idToDelete)); 
    setNews(prev => prev.filter(item => item.id !== idToDelete)); 
  } catch (error) {
    console.error("Помилка при видаленні новини:", error);
  }
};

useEffect (() => {
  const fetchNews = async () => {
    const queryNews = await getDocs(collection(db, "news"));
    
    const arrayNews = queryNews.docs.map(doc => {
      
      return {
        id: doc.id,
      ...doc.data()
      };
    })
    setNews(arrayNews);
  }
  fetchNews();

}, []);
const filteredNews = news.filter((item) =>
  item.title.toLowerCase().includes(searchQuery.toLowerCase())
);
      return(
        <main className="news-grid">
            {filteredNews.map(item =>(
            <NewsCard
            key={item.id}
            id={item.id}
            title={item.title}
            desc={item.desc}
            date={item.date}
            author={item.author}
            onDelete={handleNewsDelete}
            />
          ))}
          
        </main>
        
      )
}

export default Home;