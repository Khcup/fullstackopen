import { Pressable } from "react-native";
import { useNavigate } from "react-router-native";

import RepositoryItem from "../RepositoryItem";

const PressableRepositoryItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
      <RepositoryItem
        fullName={item.fullName}
        description={item.description}
        language={item.language}
        forksCount={item.forksCount}
        stargazersCount={item.stargazersCount}
        ratingAverage={item.ratingAverage}
        reviewCount={item.reviewCount}
        ownerAvatarUrl={item.ownerAvatarUrl}
      />
    </Pressable>
  );
};

export default PressableRepositoryItem;
