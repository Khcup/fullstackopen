import { Image, StyleSheet } from "react-native";

const avatarStyles = StyleSheet.create({
  avatarStyle: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
});

const AvatarImage = ({ imagePath }) => {
  return <Image style={avatarStyles.avatarStyle} source={{ uri: imagePath }} />;
};

export default AvatarImage;
