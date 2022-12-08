import { Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ILogin } from '../models/ILogin';

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParam } from './NavConfig'
//import { firebase } from '@react-native-firebase/storage';
//import {firebase} from '@react-native-firebase/auth'


// import firebaseApp from "../../firebase"
// import {  getAuth,signInWithEmailAndPassword, AuthCredential } from 'firebase/auth';
// const auth= getAuth(firebaseApp)


const ImagenFondo = 'https://i.pinimg.com/564x/81/ea/5c/81ea5c62cb1742e3333c92696298d236.jpg'
const InicioSesion = 'https://i.pinimg.com/564x/40/07/f2/4007f27e5a6a31902f31e87a1bbb4558.jpg'


type Props = NativeStackScreenProps<RootStackParam, 'InicioSesion'>;

const InicioSesionComponent = ({ navigation }: Props) => {

    const [email, setEmail] = useState('')
    const [contrasena, setContrasena] = useState('')

    const handlerSignIn = () => {
           }



    return (
        <View style={styles.Contenedor}>

            <ImageBackground source={{ uri: ImagenFondo }} resizeMode="cover"
                style={[styles.Imagen]} >

                <ScrollView contentContainerStyle={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}>
                        <View style={styles.login}>
                            <Image source={{ uri: InicioSesion }} style={[styles.ProfileUsser]}></Image>
                            <View>
                                <Text style={styles.Texto}>Correo electronico</Text>
                                <TextInput style={styles.Input}
                                    onChangeText={(text) => setEmail(text)}
                                    placeholder="correo123@outlook.es"></TextInput>
                            </View><View>
                                <Text style={styles.Texto}>Contraseña</Text>
                                <TextInput style={styles.Input}
                                    onChangeText={(text) => setContrasena(text)}
                                    placeholder="Contraseña"
                                    secureTextEntry={true}></TextInput>
                            </View>
                            <View style={[styles.Boton, { justifyContent: 'center', alignItems: 'center', }]}>

                                <Pressable onPress={handlerSignIn}>
                                    <Text style={{ fontWeight: '700', fontSize: 17 }}>Iniciar Sesión</Text>
                                </Pressable>
                            </View> 
                            <Text style={{ marginTop: 15, fontSize: 15, fontWeight: '400', color: 'while', }}>¿Aun no tienes cuenta?</Text>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Pressable onPress={(e) => {
                                    navigation.navigate('CrearCuenta');
                                }}>
                                    <Text style={{ fontWeight: '700', fontSize: 17, marginTop: 10 }}>Regístrate</Text>
                                </Pressable>
                            </View>

                        </View>
                </ScrollView>
            </ImageBackground >
        </View >
    )
}

export default InicioSesionComponent

const styles = StyleSheet.create({
    Boton: {
        marginTop: 10,
        borderRadius: 10,
        width: 200,
        height: 40,
        color: "white",
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#1A8BB0"
        
    },
    Contenedor: {
        backgroundColor: '#ffff',
        flex: 1,
    },
    login: {
        width: 350,
        height: 500,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        backgroundColor:'#FFFFFF90'
    },
    Imagen: {
        width: '100%',
        height: '100%',
    },
    Input: {

        width: 300,
        height: 40,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ffffff90',
        marginBottom: 20,
    },
    ProfileUsser: {
        width: 100,
        height: 100,
        marginTop: 10,
        borderRadius: 50,
        borderColor: '#ffffff',
        borderWidth: 3,
        marginBottom: 25,
    },
    Texto: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        color: 'while',
    },
    Titulo: {
        flex: 1,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: "10%",
    },

})