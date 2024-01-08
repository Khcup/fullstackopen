import React, { useState } from "react";

import RepositoryListContainer from "./RepositoryListContainer";
import useRepositories from "../../hooks/useRepositories";

const RepositoryList = () => {
  const [variables, setVariables] = useState({
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
    first: 6,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const { orderBy, orderDirection, first } = variables;

  const onChangeSearch = (query) => setSearchQuery(query);
  const onPress = (variables) => setVariables(variables);

  const { repositories, fetchMore } = useRepositories(
    orderBy,
    orderDirection,
    searchQuery,
    first
  );

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      onPress={onPress}
      repositories={repositories}
      onChangeSearch={onChangeSearch}
      searchQuery={searchQuery}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
