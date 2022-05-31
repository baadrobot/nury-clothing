import { async } from '@firebase/util';
import {initializeApp} from 'firebase/app';
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDm-I7Xo2m8AJVBfsYQWloCRCLSmXcLQvg",
    authDomain: "nury-clothing-db.firebaseapp.com",
    projectId: "nury-clothing-db",
    storageBucket: "nury-clothing-db.appspot.com",
    messagingSenderId: "478159317066",
    appId: "1:478159317066:web:7ca9068879d83a28f3deb3"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopop = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
      userAuth, 
      // изначально это пустой объект, 
      // это надо для того чтоб если вдруг в displayName ничего не придёт
      additionalInformation = {}
    ) => {
    // для защиты
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt,
                // если displayName не передали(null) то используя оператор спреда(...)
                // добавить на место displayName то что приедт
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error);
        }
    }
    
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
      // для защиты
      if(!email || !password) return;

      return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    // для защиты
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}