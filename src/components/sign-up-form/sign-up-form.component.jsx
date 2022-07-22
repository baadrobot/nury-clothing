import { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {SignUpContainer} from './sign-up-form.styles.jsx';
import { signUpStart } from "../../store/user/user.action";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    // creating a state with an object
    const [formFields, setFormFields] = useState(defaultFormFields);
    // restructurizing it for comfortable usage
    const {displayName, email, password, confirmPassword} = formFields;
    const dispatch = useDispatch();

    // console.log(formFields);
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(password !== confirmPassword) {
            alert("password do no match");
            return;
        }

        try {
            // const {user} = await createAuthUserWithEmailAndPassword(
            //     email,
            //     password
            // );

            // await createUserDocumentFromAuth(user, displayName);
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
        } catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannt create user, email already in use')
            } else {
                console.log('USER CREATION ERROR ', error);
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
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form >
                
                <FormInput 
                    label="Display Name"
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name='displayName' 
                    value={displayName}
                />

                
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

                
                <FormInput 
                    label="Confirm password"
                    type="password" 
                    required
                    onChange={handleChange} 
                    name='confirmPassword' 
                    value={confirmPassword}
                />
                
                <Button 
                    type="submit"
                    onClick={handleSubmit}
                >
                {/* кнопкао не записывает в БД Дисплей нейм */}
                    Sign up
                </Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;