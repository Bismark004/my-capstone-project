import Logo from "./Logo";
import { Link } from "react-router-dom";
import FavouriteIcon from "./FavouriteIcon";
import WatchLaterIcon from "./WatchLaterIcon";

const Header = () => {
  return (
    <div className="w-full bg-blue-900 flex justify-between items-center h-20 p-4">
      <Logo />
      <div className="flex gap-6">
        <Link to="/favorites">
          <FavouriteIcon />
        </Link>
        <Link to="/watchlater">
          <WatchLaterIcon />
        </Link>
      </div>
    </div>
  );
};
export default Header;
