import React, { Component } from "react";
import {useState, useRef} from "react-native"
import { Button, SafeAreaView, StyleSheet, View, Text,Image } from "react-native";
import { Video, AVPlaybackStatus } from 'expo-av';

//Importing the installed libraries
import * as FS from "expo-file-system";
import * as ImagePicker from "expo-image-picker";


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraRollPer: null,
      disableButton: false,
      img_base64: "",
      video_base64:"",
    };
  }

  async componentDidMount() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    this.setState((state, props) => {
      return {
        cameraRollPer: status === "granted",
        disableButton: false,
      };
    });
  }

  uriToBase64 = async (uri) => {
    let base64 = await FS.readAsStringAsync(uri, {
      encoding: FS.EncodingType.Base64,
    });
    return base64;
  };

  getMedia = async()=>{
    fetch('http://192.168.1.6:8081/api/get_user_image',
    {headers:{'user_id':1}})
  .then((response) => response.json())
  .then((data) => {
    if (data.type == 'jpeg') {
      this.setState((state, props) => {
        return {
          img_base64:data.media
        };
      });
    }
    else{
      console.log("here")
      this.setState((state, props) => {
        return {
          video_base64:data.media
        };
        
      });
      console.log(this.state)
    }
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
        "attachment-linkid":"1", //identifier to attach in the DB
        "attachment-type":"user" //Options: user,ad,chat 
      },
      httpMethod: "POST",
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });
    // console.log(response.headers);
    // console.log(response.body);
  };

  render() {
    // const video = useRef(null);
   
    var image_media  = `data:image/jpeg;base64,${this.state.img_base64}`;
    var video_media = `data:video/mp4;base64,${this.state.video_base64}`;
    return (
      
      <SafeAreaView style={styles.container}>
         <View  style={styles.image}>
          <Video
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            isLooping
            source={{uri: video_media}} />
          <Image  style={{height:50, width:50}} source={{uri: image_media}}/>
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
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
});