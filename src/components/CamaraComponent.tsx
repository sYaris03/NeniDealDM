import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const CamaraComponent = () => {

  const [uploading, setUploading] = useState<boolean>(false)
  //const [imagen, setImagen] = useState<string>('https://via.placeholder.com/200');

  const uploadImage = async (foto: string) => {
    //const { uri } = image;
    
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
    });
  }


  return (
    <View>
      <Pressable onPress={(e) => {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
          //console.log(image.path);
          //setImagen(image.path)
          uploadImage(image.path);
        });
      }}><Text style={{ fontSize: 30 }}>Abrir Camara</Text></Pressable>
    </View>
  )
}

export default CamaraComponent

const styles = StyleSheet.create({})