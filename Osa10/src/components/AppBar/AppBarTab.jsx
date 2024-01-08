import { Link } from "react-router-native";

import TabText from "./TabText";

const AppBarTab = ({ tabName, path, onPress, style }) => {
  return (
    <Link onPress={onPress} to={path}>
      <TabText text={tabName} style={style} />
    </Link>
  );
};

export default AppBarTab;
