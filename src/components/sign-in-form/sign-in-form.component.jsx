import { useState } from "react";
import { 
    createUserDocumentFromAuth,
    signInWithGooglePopop,
    signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    // creating a state with an object
    const [formFields, setFormFields] = useState(defaultFormFields);
    // restructurizing it for comfortable usage
    const { email, password} = formFields;

    // console.log(formFields);
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopop();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const user = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        // get name and value from targeted input
        const {name, value} = event.target;
        // change state with new value by its name
        setFormFields({...formFields, [name]: value});
    }

    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form >
                           
                <FormInput 
                    label="Email"
                    type="email" 
                    required
                    onChange={handleChange} 
                    name='email' 
                    value={email}
                />

                
                <FormInput 
                    label="Password"
                    type="password" 
                    required
                    onChange={handleChange} 
                    name='password' 
                    value={password}
                />

                <div className="buttons-container">
                    <Button type="submit" buttonType="default" onClick={handleSubmit}>
                        Sign In
                    </Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;