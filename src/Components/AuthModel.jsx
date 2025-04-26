import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Box } from "@mui/material";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";
import { useEffect } from "react";
import { doc, setDoc, getDoc  } from "firebase/firestore";
import { db } from "../firebase"; 
import useAuthStore from "./AuthStore";



export default function AuthModal({ open, onClose }) {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser, setRole} = useAuthStore();



  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isLogin]);

  const handleSubmit = async(e) => {
    const auth = getAuth();
    e.preventDefault();
    try{
      if (isLogin) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      setUser(user);

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        setRole(role);
      } else {
        console.log("User document not found in Firestore");
        setRole(null);
      }
    
      console.log("Logging in with:", email, password);

    } else {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      role: "user", 
      });

      setUser(user); 
      setRole("user");

      console.log("Registering with:", email, password);
    }
    onClose();
    }
    catch (error) {
      console.error("Помилка авторизації:", error.message);
    }
  };







  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isLogin ? "Login" : "Register"}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            {isLogin ? "Login" : "Register"}
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Button onClick={() => setIsLogin(!isLogin)} size="small">
            {isLogin ? "Register" : "Login"}
          </Button>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

