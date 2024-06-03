import { db } from './config.ts';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const saveUserData = async (user: user | null) => {
    try {
        if (user !== null){
            await setDoc(doc(db, 'users', user.uid.toString()), user);
            console.log('User data saved successfully');
        }
    } catch (error) {
        console.error('Error saving user data:', error);
    }
};

export const getUserData = async (uid: string) => {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid.toString()));
        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            console.log('No such document!');
            return null;
        }
    } catch (error) {
    }
};