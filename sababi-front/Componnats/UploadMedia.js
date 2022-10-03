import React, { Component } from "react";
import { Button, SafeAreaView, StyleSheet, Alert, Text } from "react-native";

//Importing the installed libraries
import * as FS from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { View } from "native-base";

export default class Media extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraRollPer: null,
      disableButton: false,
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
    let host = "192.168.1.5";
    let route = "";
    let port = "8081";
    let url = "";
    let content_type = "";
    type === "image"
      ? ((route = "/api/upload_image"), (content_type = "image/jpeg"))
      : ((route = "/upload_video"), (content_type = "video/mp4"));
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
    return (
      //<SafeAreaView style={styles.container}>
        <View style={styles.container}>
        {this.state.cameraRollPer ? (
          <Button color={"indigo"}
            title="Upload Here"
            disabled={this.state.disableButton}
            onPress={async () => {
              await this.pickMedia();
              this.setState((s, p) => {
                return {
                  cameraRollPer: s.cameraRollPer,
                  disableButton: false,
                };
              });
            }}
          />
        ) : (
          <Text>Camera Roll Permission Required ! </Text>
        )}
        </View>
      //</SafeAreaView>
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
});