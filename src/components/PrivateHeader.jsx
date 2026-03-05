import { useLocation } from "react-router-dom";
import Header from "./Header";
import PrivateNavBar from "./PrivateNavBar";

function PrivateHeader() {
  const location = useLocation();
  const destinoLogo = location.pathname === "/espera" ? "/espera" : "/home";

  return (
    <Header logoLink={destinoLogo}>
      {" "}
      <PrivateNavBar />
    </Header>
  );
}

export default PrivateHeader;
