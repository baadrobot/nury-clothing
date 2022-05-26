import { signInWithGooglePopop, createUserDocumentFromAuth } from "../../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopop();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    return (
        <div>
            <h1>SIGN IN</h1>
            <button onClick={logGoogleUser}>Sign in with Google popup</button>
        </div>
    );
}

export default SignIn;