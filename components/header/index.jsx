import Team from "./team";
import Logout from "./logout";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-app-name-container">
        <h1>Races</h1>
      </div>
      <div className="header-profile-container">
        <Team/>
        <Logout/>
      </div>
    </div>
  )
}

export default Header;
