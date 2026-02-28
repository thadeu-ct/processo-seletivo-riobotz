import Header from "./Header";
import PrivateNavBar from "./PrivateNavBar";

function PrivateHeader() {
  return (
    <Header logoLink="/home">
      <PrivateNavBar />
    </Header>
  );
}

export default PrivateHeader;
