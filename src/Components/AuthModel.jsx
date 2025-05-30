import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import useAuthStore from "./AuthStore";
import Loader from "./Loader";

export default function AuthModal({ open, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isLogin]);

  const handleSubmit = async (e) => {
    const auth = getAuth();
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        setUser(user);

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUser(data);
        } else {
          clearUser();
        }
        console.log("Logging in with:", email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          role: "user",
          name: "user",
          bio: "bio",
          avatar: "",
        });

        setUser(user);

        console.log("Registering with:", email, password);
      }
      onClose();
    } catch (error) {
      console.error("Помилка авторизації:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isLogin ? "Login" : "Register"}</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Loader />
        ) : (
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
        )}

        {!isLoading && (
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Button onClick={() => setIsLogin(!isLogin)} size="small">
              {isLogin ? "Register" : "Login"}
            </Button>
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
