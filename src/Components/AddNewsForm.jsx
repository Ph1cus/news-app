import { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import {db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import useAuthStore from "./AuthStore";

const AddNewsForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [fullContent, setFullContent] = useState("");
  const {user} = useAuthStore();

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0]; 
    setDate(formattedDate);

    if (user?.name){
      setAuthor(user.name);
    }

  }, [user]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      desc,
      date,
      author,
      fullContent
    };

    console.log("Новина для відправки:", newPost);
    try {
        await addDoc(collection(db, "news"), {
          title,
          desc,
          date,
          author,
          fullContent
        });
        alert("Новину додано!");
        setTitle("");
        setDesc("");
        setDate("");
        setAuthor("");
        setFullContent("");
      } catch (error) {
        console.error("Помилка додавання новини:", error);
        alert("Не вдалося додати новину.");
      }
    };
  
  

  return (
    <><Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required />
      <TextField
        label="Опис"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
        multiline
        rows={4} />
      <TextField
        label="Дата"
        type ="date"  
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required />
      <TextField
        label="Автор"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required />
      <TextField
        label="Текст новини"
        value={fullContent}
        onChange={(e) => setFullContent(e.target.value)}
        required
        multiline
        rows={6}/>
  <Box sx={{ mt: 5 }}>
    <Button type="submit" variant="contained" color="primary">
      Додати новину
    </Button>
  </Box>
  </Box></>
    
  );
};

export default AddNewsForm;
