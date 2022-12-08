import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParam } from './NavConfig';

//import firebaseApp from '../../firebase';
// import { getAuth, signOut } from 'firebase/auth'
// import { NavigationContainer } from '@react-navigation/native';
// import { DrawerNavigation } from '../navigation/DrawerNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';

//const auth = getAuth(firebaseApp)

type Props = NativeStackScreenProps<RootStackParam, 'Principal'>;
const PrincipalComponent = ({ navigation }: Props) => {
  return (

    <View style={{ flex: 1 }}>
      <SafeAreaProvider >
        <HeaderRNE
        backgroundColor='green'
          leftComponent={
            <View style={styles.headerRight}>

              <Pressable onPress={() => {
                navigation.navigate('Menu')
              }}>
                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2976/2976215.png' }} style={styles.Imagen} ></Image>
              </Pressable>
            </View>
          }
          centerComponent={{ text: 'Articulos', style: styles.heading }}
          rightComponent={
            <View style={styles.headerRight}>

              <Pressable onPress={() => {
                //signOut(auth)
                navigation.goBack();
              }}>
                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2997/2997925.png' }} style={styles.Imagen} ></Image>
              </Pressable>
            </View>
          }
        />
      </SafeAreaProvider>

    </View>
  )
}

export default PrincipalComponent

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
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  Imagen: {
    width: 20,
    height: 20,
    marginEnd: 10,
  },
})