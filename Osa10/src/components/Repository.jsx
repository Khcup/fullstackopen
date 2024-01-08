import { FlatList, StyleSheet, View } from "react-native";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";
import useRepository from "../hooks/useRepository";

import ReviewItem from "./ReviewItem";
import RepositoryItem from "./RepositoryItem";
import ItemSeparator from "./ItemSeparator";
import Button from "./Button";

import theme from "../theme";

const repositoryStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    display: "flex",
    felxDirection: "column",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  separator: {
    height: 1,
  },
});

const Repository = () => {
  const { id } = useParams();
  const first = 2;

  const { repository, loading, fetchMore } = useRepository(id, first);

  if (loading) {
    return null;
  }

  const onEndReach = () => {
    fetchMore();
  };

  const reviews = repository
    ? repository.reviews.edges.map((egde) => egde.node)
    : [];

  const handleSubmit = () => {
    return Linking.openURL(repository.url);
  };

  return (
    <>
      <RepositoryItem
        fullName={repository.fullName}
        description={repository.description}
        language={repository.language}
        forksCount={repository.forksCount}
        stargazersCount={repository.stargazersCount}
        ratingAverage={repository.ratingAverage}
        reviewCount={repository.reviewCount}
        ownerAvatarUrl={repository.ownerAvatarUrl}
      />
      <View style={repositoryStyles.container}>
        <Button value="Open in GitHub" onSubmit={handleSubmit} />
      </View>
      <View style={repositoryStyles.separator}></View>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </>
  );
};

export default Repository;
