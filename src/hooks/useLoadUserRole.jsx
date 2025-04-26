import { useEffect } from "react";
import { auth, db } from "../firebase"; 
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import useAuthStore from "../Components/AuthStore";

const useLoadUserRole = () => {
  const setRole = useAuthStore((state) => state.setRole);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setRole(userData.role); 
        }
      } else {
        setRole(null); // Якщо юзер вийшов
      }
    });

    return () => unsubscribe(); // Відписуємося при виході з компонента
  }, []);
};

export default useLoadUserRole;
