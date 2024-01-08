import { View, StyleSheet } from "react-native";

import Text from "../Text";

export const profileStatsStyles = StyleSheet.create({
  container: {
    felxDirection: "column",
    alignItems: "center",
  },
});

const ProfileStats = ({ number, value, testID }) => {
  return (
    <View style={profileStatsStyles.container}>
      <Text
        color="textPrimary"
        fontSize="subheading"
        fontWeight="bold"
        testID={testID}
      >
        {number >= 1000
          ? (number / 1000).toFixed(1).toString() + "k"
          : number.toString()}
      </Text>
      <Text color="textSecondary">{value}</Text>
    </View>
  );
};

export default ProfileStats;
