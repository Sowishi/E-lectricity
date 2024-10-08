import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const useGetUsers = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);

  const getUsers = () => {
    setLoading(true);
    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
      const output = [];
      snapshot.forEach((doc) => {
        output.push({ ...doc.val(), id: doc.key });
      });
      setUsers(output);
    });
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { users, loading, getUsers };
};

export default useGetUsers;
