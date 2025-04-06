import NewsCard from "../../Components/News-card";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import './Home.css'



function Home(){
const [news, setNews] = useState([]);

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
      return(
        <main className="news-grid">
            {news.map(item =>(
            <NewsCard
            key={item.id}
            id={item.id}
            title={item.title}
            desc={item.desc}
            date={item.date}
            author={item.author}
            
            />
          ))}
          
        </main>
        
      )
}

export default Home;