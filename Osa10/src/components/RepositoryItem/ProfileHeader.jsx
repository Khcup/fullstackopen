import { View, StyleSheet } from "react-native";

import AvatarImage from "./AvatarImage";
import Text from "../Text";

import theme from "../../theme";

const profileHeaderStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flexDirection: "row",
    flexGrow: 1,
    padding: 16,
  },
  avatarContainer: {
    frexGrow: 0,
    paddingRight: 16,
  },
  infoContainer: {
    flex: 1,
    flexWrap: "wrap",
    paddingTop: 3,
  },
  textContainer: {
    paddingVertical: 6,
    marginBottom: 3,
  },
  languageStyle: {
    backgroundColor: theme.colors.primary, // "#0366d6",
    alignSelf: "flex-start",
    borderRadius: 3,
    padding: 3,
    overflow: "hidden",
  },
});

const ProfileHeader = ({ fullName, ownerAvatarUrl, description, language }) => {
  return (
    <View style={profileHeaderStyles.container}>
      <View style={profileHeaderStyles.avatarContainer}>
        <AvatarImage imagePath={ownerAvatarUrl} />
      </View>
      <View style={profileHeaderStyles.infoContainer}>
        <Text fontSize="subheading" fontWeight="bold" testID="repositoryName">
          {fullName}
        </Text>
        <View style={profileHeaderStyles.textContainer}>
          <Text color="textSecondary" testID="repositoryDescription">
            {description}
          </Text>
        </View>
        <View>
          <Text
            color="white"
            style={profileHeaderStyles.languageStyle}
            testID="repositoryLanguage"
          >
            {language}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
