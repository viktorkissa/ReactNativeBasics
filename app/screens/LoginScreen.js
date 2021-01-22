import React from 'react';
import { Image, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import { FadeInView } from '../components/AnimatedComponents';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';

import logoImg from '../assets/logo.png';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(4).label('Password')
});

function LoginScreen({ navigation, route }) {

    const handleLogin = (values) => {
        console.log(values);
        navigation.navigate('Account', values);
    };

    return (
        <Screen style={styles.container}>
            <FadeInView>
                <Image 
                    style={styles.logo}
                    source={logoImg} 
                />
                <AppForm 
                    initialValues={{ email: '', password: '' }}
                    onSubmit={handleLogin}
                    validationSchema={validationSchema}
                >
                   <AppFormField 
                        placeholder='Email'
                        icon='email'
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='email-address'
                        name='email'
                        textContentType='emailAddress' // for IOS to autofill
                    />
                    <AppFormField 
                        icon='lock'
                        placeholder='Password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        name='password'
                        textContentType='password' 
                        secureTextEntry
                    />
                    <SubmitButton title='Login' />
                </AppForm>   
            </FadeInView>         
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20
    }
});

export default LoginScreen;