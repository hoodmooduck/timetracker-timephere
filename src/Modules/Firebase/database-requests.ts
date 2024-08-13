// firebaseApi.js
import { db } from "./config.ts";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const saveUserData = async (user: user | null) => {
  if (user !== null) {
    await setDoc(doc(db, "users", user.uid.toString()), user);
  }
};

export const getUserData = async (uid: string) => {
  const userDoc = await getDoc(doc(db, "users", uid.toString()));
  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    throw new Error("No such document!");
  }
};
