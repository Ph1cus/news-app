import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Box } from "@mui/material";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";
import { useEffect } from "react";


export default function AuthModal({ open, onClose }) {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      console.log("Logging in with:", email, password);
    } else {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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

