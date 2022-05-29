import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import { 
    auth,
    signInWithGooglePopop, 
    signInWithGoogleRedirect,
    createUserDocumentFromAuth
} from "../../../utils/firebase/firebase.utils";

import SignUpForm from "../../sign-up-form/sign-up-form.component";

const SignIn = () => {
    // useEffect(() => {
    //     const getResponse = async () => {
    //         const response = await getRedirectResult(auth);
    //         if(response) {
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     }
    //     getResponse();
    // }, [])

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopop();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>SIGN IN</h1>
            <button onClick={logGoogleUser}>Sign in with Google popup</button>
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google redirect</button> */}
            <SignUpForm/>
        </div>
    );
}

export default SignIn;