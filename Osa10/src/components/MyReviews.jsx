import { FlatList } from "react-native";

import useAuthUser from "../hooks/useAuthUser";
import ReviewItem from "./ReviewItem";
import ItemSeparator from "./ItemSeparator";

const MyReviews = () => {
  const { data } = useAuthUser(true);
  const reviews = data ? data.me.reviews.edges.map((egde) => egde.node) : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyReviews;
