import OrderSelector from "./OrderSelector";
import SearchBar from "./SearchBar";

const RepositoryListHeader = ({ onPress, onChangeSearch, searchQuery }) => (
  <>
    <SearchBar onChangeSearch={onChangeSearch} searchQuery={searchQuery} />
    <OrderSelector onPress={onPress} />
  </>
);

export default RepositoryListHeader;
