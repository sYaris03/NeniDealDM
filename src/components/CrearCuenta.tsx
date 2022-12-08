import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParam } from './NavConfig'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

import { IUser } from '../models/IUser';

// import { createUserWithEmailAndPassword, getAuth, } from 'firebase/auth';
// import firebaseApp from "../../firebase"
// import {getFirestore, addDoc, collection} from 'firebase/firestore'

// const auth= getAuth(firebaseApp)
// const firestore= getFirestore(firebaseApp)

import firestore from '@react-native-firebase/firestore';
type Props = NativeStackScreenProps<RootStackParam, 'CrearCuenta'>;

const CrearCuentaComponent = ({ navigation }: Props) => {
  const [contrasena, setContrasena] = useState('')
  const [correo, setCorreo] = useState('')

  const [imagen, setImagen] = useState(String);
  const [imagenload, setImagenLoad] = useState<boolean>(false)
  const [imagenPerfil, setImagenPerfil] = useState(String);
  //const ImageCargada="'" + imagen + "'"

  const [uploading, setUploading] = useState<boolean>(false)

  const [user, setUser] = useState<IUser>({
    Foto:"",
    Nombre: "",
    ApePaterno: "",
    ApeMaterno: "",
    Direccion: "",
    Usuario: "",
    Contrasena: "",
  })

  const uploadImage = async (foto: string) => {
    ImagenPerfil();
    setUploading(true);
    const filename = foto?.substring(foto.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? foto?.replace('file://', '') : foto
    const imageName = filename;//getUniqueId();
    const imagePath = uploadUri;//'images/' + imageName + '.jpg';

    var reference = storage().ref(filename);
    const task = reference.putFile(uploadUri);
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    task.then(async () => {
      console.log('Image uploaded to the bucket!');
      const mDownloadUrl = await storage()
        .ref(filename)
        .getDownloadURL();
      console.log('Image Upload URL : ', mDownloadUrl);
      setUploading(false);
      setUser({ ...user, Foto: imagen} );
      setImagenLoad(true);
    });
  }

  function ImagenPerfil() {
    if (imagenload == false) {
      return (
        setImagenPerfil("https://cdn-icons-png.flaticon.com/512/748/748119.png")
      )
    }else{

      return( setImagenPerfil('"'+ imagen +'"')
      )
    }
  }

  const Agregar = async () => {
    try {
      firestore()
        .collection('Usuario')
        .add({
          user
        })
        .then(() => {
          console.log('Usuario Creado');
        });
    } catch (error) {
      console.log("Error agregar");
    }
  }

  return (
    <ScrollView>
      <View style={styles.contenerdor}>
        <View style={{ alignContent: 'center', justifyContent: 'center', marginTop:'10%'}}>
          <View style={{ borderRadius: 100, width: 150, height: 150, backgroundColor:'#D9ECDC', alignItems:'center', justifyContent:'center'}}>
          <Pressable onPress={(e) => {
            ImagePicker.openCamera({
              width: 300,
              height: 400,
              cropping: true,
            }).then(image => {
              uploadImage(image.path);
            });
          }}>
            <Image source={{ uri: "'"+setImagenPerfil+"'" }} style={styles.Imagen} ></Image>
          </Pressable>
          </View>
        </View>
        <View>
          <Text style={[styles.Texto, { marginTop: '8%' }]}>Nombre</Text>
          <TextInput style={styles.Input}
            onChangeText={(text) => setUser({ ...user, Nombre: (text) })}
            placeholder="Nombre"></TextInput>
        </View>
        <View>
          <Text style={styles.Texto}>Apellido Paterno</Text>
          <TextInput style={styles.Input}
            onChangeText={(text) => setUser({ ...user, ApePaterno: (text) })}
            placeholder="Apellido Paterno"></TextInput>
        </View>
        <View>
          <Text style={styles.Texto}>Apellido Materno</Text>
          <TextInput style={styles.Input}
            onChangeText={(text) => setUser({ ...user, ApeMaterno: (text) })}
            placeholder="Apellido Materno"></TextInput>
        </View>
        <View>
          <Text style={styles.Texto}>Dirección</Text>
          <TextInput style={styles.Input}
            onChangeText={(text) => setUser({ ...user, Direccion: (text) })}
            placeholder="Calle ..."></TextInput>
        </View>
        <View>
          <Text style={styles.Texto}>Correo electronico</Text>
          <TextInput style={styles.Input}
            onChangeText={(text) => {
              //setCorreo(text)
              setUser({ ...user, Usuario: (text) })
            }}
            //onChangeText={(text) => setCorreo(text)}
            placeholder="correo123@outlook.es"></TextInput>
        </View>
        <View>
          <Text style={styles.Texto}>Contraseña</Text>
          <TextInput style={styles.Input}
            onChangeText={(text) => {
              //setContrasena(text)
              setUser({ ...user, Contrasena: (text) })
            }}
            //onChangeText={(text) => setContrasena(text)}
            placeholder="Contraseña"
            secureTextEntry={true}></TextInput>
        </View>
        {/* <View>
          <Text style={styles.Texto}>Confirmar contraseña</Text>
          <TextInput style={styles.Input}
            onChangeText={(text) => setConfiContrasena(text)}
            placeholder="Confirmar Contraseña"
            secureTextEntry={true}></TextInput>
        </View> */}
        <View style={[styles.Boton, { justifyContent: 'center', alignItems: 'center', }]}>

          <Pressable onPress={Agregar}>
            <Text>Crear cuenta</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}

export default CrearCuentaComponent

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
  contenerdor: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Imagen: {
    width: 100,
    height: 100,
  },
  Input: {
    width: 330,
    height: 40,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 10,
  },
  Texto: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: 'while',
  },
  Camara: {
    width: 80,
    height: 80,
    //marginBottom: 5, 
    //marginTop:15
  },
  Circulo: {
    backgroundColor: '#454545',
    width: 100,
    height: 100,
    borderRadius: 100,
    margin: 15,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
})
