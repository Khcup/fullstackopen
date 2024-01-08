import { StyleSheet, View } from "react-native";
import { Route, Routes } from "react-router-native";

import AppBar from "./AppBar/";
import Repository from "./Repository";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import CreateReview from "./CreateReview";
import MyReviews from "./MyReviews";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/SignIn" element={<SignIn />} exact />
        <Route path="/SignUp" element={<SignUp />} exact />
        <Route path="/repository/:id" element={<Repository />} exact />
        <Route path="/CreateReview" element={<CreateReview />} exact />
        <Route path="/MyReviews" element={<MyReviews />} exact />
      </Routes>
    </View>
  );
};

export default Main;
