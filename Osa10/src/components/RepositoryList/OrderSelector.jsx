import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Menu, Provider } from "react-native-paper";

import Text from "../Text";

const styles = StyleSheet.create({
  sortingBar: {
    height: 58,
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "start",
  },
});

const OrderSelector = ({ onPress }) => {
  const [visible, setVisible] = useState(false);
  const [sortingOrder, setSortingOrder] = useState("Latest repositories");

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View style={styles.sortingBar}>
        <Menu
          visible={visible}
          onDsmiss={closeMenu}
          anchor={
            <Button onPress={openMenu}>
              <Text color="black" fontSize="subheading">
                {sortingOrder}
              </Text>
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              setSortingOrder("Latest repositories");
              onPress({ orderBy: "CREATED_AT", orderDirection: "DESC" }); //"CREATED_AT", "DESC"); //sortingOrder); //("CREATED_AT", "DESC");
              closeMenu();
            }}
            title="Latest repositories"
          />
          <Menu.Item
            onPress={() => {
              setSortingOrder("Highest rated repositories");
              onPress({ orderBy: "RATING_AVERAGE", orderDirection: "DESC" }); //"RATING_AVERAGE", "DESC");
              closeMenu();
            }}
            title="Highest rated repositories"
          />
          <Menu.Item
            onPress={() => {
              setSortingOrder("Lowest rated repositories");
              onPress({ orderBy: "RATING_AVERAGE", orderDirection: "ASC" }); //"RATING_AVERAGE", "ASC");
              closeMenu();
            }}
            title="Lowest rated repositories"
          />
        </Menu>
      </View>
    </Provider>
  );
};

export default OrderSelector;
