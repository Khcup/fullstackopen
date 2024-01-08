// import { useState } from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
});

const SearchBar = ({ searchQuery, onChangeSearch }) => {
  return (
    <Searchbar
      style={styles.searchBar}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default SearchBar;
