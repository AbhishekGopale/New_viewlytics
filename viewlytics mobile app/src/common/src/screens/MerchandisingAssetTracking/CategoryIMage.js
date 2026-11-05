// ImageCaptureButton.js
import React from "react";
import { TouchableOpacity, Image } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { Images } from "../../assets/images/map";

const ImageCaptureButton = ({ setImage, setPath }) => {
  const takePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
    }).then((image) => {
      setImage(image);
      setPath(image.path);
    });
  };

  return (
    <TouchableOpacity onPress={takePhoto}>
      {setImage == null ? (
        <Image source={Images.camera} style={styles.Modalimages} />
      ) : (
        <Image source={{ uri: setPath }} style={styles.Modalimages} />
      )}
    </TouchableOpacity>
  );
};

export default ImageCaptureButton;
