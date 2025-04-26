import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useAuthStore from "../Components/AuthStore"; 
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../firebase";

const useAuth = () => {
  const { setUser, clearUser } = useAuthStore(); 


  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // setUser(firebaseUser);
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUser(data); 
        } else {
          clearUser(); 
        }
      } else {
        clearUser();
      }
    });

    return () => unsubscribe();
  }, [setUser, clearUser]);

  const logout = () => {
    const auth = getAuth();
    auth.signOut();
  };
};

export default useAuth;