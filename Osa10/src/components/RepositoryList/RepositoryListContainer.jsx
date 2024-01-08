import React from "react";
import { FlatList, StyleSheet } from "react-native";

import RepositoryListHeader from "./RepositoryListHeader";
import PressableRepositoryItem from "./PressableRepositoryItem";

import ItemSeparator from "../ItemSeparator";

const styles = StyleSheet.create({
  listHeader: {
    zIndex: 1,
    elevation: 1,
  },
});

class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { onPress, onChangeSearch, searchQuery } = this.props;
    return (
      <RepositoryListHeader
        onPress={onPress}
        onChangeSearch={onChangeSearch}
        searchQuery={searchQuery}
      />
    );
  };

  render() {
    const { repositories, onEndReach } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        testID="RepositoryListContainer"
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        ListHeaderComponentStyle={styles.listHeader}
        renderItem={({ item }) => <PressableRepositoryItem item={item} />}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

export default RepositoryListContainer;
