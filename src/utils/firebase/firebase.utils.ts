import {initializeApp} from 'firebase/app';
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    NextOrObserver,
    User,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot,
} from 'firebase/firestore'

import { Category } from '../../store/categories/category.types';

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
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = {
    title: string;
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
        collectionKey: string,
        objectsToAdd: T[],
    ): Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();
    console.log('done');
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    // полученные данные с ДБ переводим в нужную структуру как ниже закоменнтировано
    return querySnapshot.docs.map(
        (docSnapshot) => docSnapshot.data() as Category
    );
};

export type AdditionalInformation = {
    displayName?: string;
}

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
}

export const createUserDocumentFromAuth = async (
      userAuth: User,
    //   displayName,
      // изначально это пустой объект, 
      // это надо для того чтоб если вдруг в displayName ничего не придёт
      additionalInformation = {} as AdditionalInformation
    ): Promise<void | QueryDocumentSnapshot<UserData>> => {
    // для защиты
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { email} = userAuth;
        const createdAt = new Date();
        
        try {
            await setDoc(userDocRef, {
                // displayName, 
                email, 
                createdAt,
                // если displayName не передали(null) то используя оператор спреда(...)
                // добавить на место displayName то что приедт
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error);
        }
    }
    
    return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    // для защиты
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    // для защиты
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => 
    onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};