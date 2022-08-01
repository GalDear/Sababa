import React, { Component, useState } from "react";
import { Button, SafeAreaView, StyleSheet, View, Text,Image } from "react-native";
//import { Image as compImage} from 'react-native-compressor';

//Importing the installed libraries
import * as FS from "expo-file-system";
import * as ImagePicker from "expo-image-picker";


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraRollPer: null,
      disableButton: false,
      img_base64: "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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k=",
    };
  }

  compressImage = async (uri, format = SaveFormat.JPEG) => { // SaveFormat.PNG
    const result = await manipulateAsync(
        uri,
        [{ resize: { width: 1200 } }],
        { compress: 0.7, format }
    );

    return  { name: `${Date.now()}.${format}`, type: `image/${format}`, ...result };
    // return: { name, type, width, height, uri }
};

  async componentDidMount() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    this.setState((state, props) => {
      return {
        cameraRollPer: status === "granted",
        disableButton: false,
      };
    });
  }

  // showAlert = () =>
  //   Alert.alert(
  //     "Connection Problem",
  //     "Internet or Server Problem ",
  //     [
  //       {
  //         text: "Try Again",
  //         onPress: () => {
  //           this.resetData();
  //         },
  //         style: "cancel",
  //       },
  //     ],
  //     {
  //       cancelable: true,
  //       onDismiss: () => {
  //         this.resetData();
  //       },
  //     }
  //   );

  uriToBase64 = async (uri) => {
    let base64 = await FS.readAsStringAsync(uri, {
      encoding: FS.EncodingType.Base64,
    });
    return base64;
  };

  getMedia = async()=>{
    fetch('http://192.168.1.6:8081/api/get_user_image',{headers:{'user_id':1}})
  .then((response) => response.json())
  .then((data) => {
    this.setState((state, props) => {
      return {
        img_base64:data.image
      };
    });
  });
  }
  
 
  pickMedia = async () => {
    this.setState((state, props) => {
      return {
        cameraRollPer: state.cameraRollPer,
        disableButton: true,
      };
    });
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
    });
    if (result.cancelled) {
      return;
    }
    if (result.type == "image") {
      await this.toServer({
        type: result.type,
        base64: result.base64,
        uri: result.uri,
      });
    } else {
      let base64 = await this.uriToBase64(result.uri);
      await this.toServer({
        type: result.type,
        base64: base64,
        uri: result.uri,
      });
    }
  };

  toServer = async (mediaFile) => {
    let type = mediaFile.type;
    let schema = "http://";
    let host = "192.168.1.6";
    let route = "/api/upload_image";
    let port = "8081";
    let url = "";
    let content_type = "";
    type === "image"
      ? (content_type = "image/jpeg")
      : (content_type = "video/mp4");
    url = schema + host + ":" + port + route;

    let response = await FS.uploadAsync(url, mediaFile.uri, {
      headers: {
        "content-type": content_type,
        "attachment-linkid":"2", //identifier to attach in the DB
        "attachment-type":"user" //Options: user,ad,chat 
      },
      httpMethod: "POST",
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });
    console.log(response.headers);
    console.log(response.body);
  };

  render() {
   
    var base64Icon = `data:image/jpeg;base64,${this.state.img_base64}`;
    return (
      
      <SafeAreaView style={styles.container}>
         <View  style={styles.image}>

          <Image  style={{height:50, width:50}} source={{uri: base64Icon}}/>
          </View>
          <View  style={styles.container}>
          <Button
            title="Get Image"
            onPress={async () => {
              await this.getMedia();
            }}
          />
        </View>
        <View style={styles.container}>{
         this.state.cameraRollPer ? (
          <Button
            title="Pick From Gallery"
            disabled={this.state.disableButton}
            onPress={async () => {
              await this.pickMedia();
              this.setState((s, p) => {
                return {
                  cameraRollPer: s.cameraRollPer,
                  disableButton: false,
                };
              }
              );
              await this.getMedia();
            }}
          />
        ) : (
          <Text>Camera Roll Permission Required ! </Text>
        )}
        </View>
       
       
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image:{
    flex: 1,
    // alignItems: "right",
    // justifyContent: "right",
    // backgroundColor: "#aff"
  }
});