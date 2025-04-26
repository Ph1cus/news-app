import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useAuthStore from "../Components/AuthStore"; 
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../firebase";

const useAuth = () => {
  const { setUser, setRole } = useAuthStore(); 


  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setRole(data.role); 
        } else {
          setRole(null); 
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, [setUser, setRole]);

  const logout = () => {
    const auth = getAuth();
    auth.signOut();
  };
};

export default useAuth;