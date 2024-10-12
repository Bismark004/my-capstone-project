import Logo from "./Logo";
import FavouriteIcon from "./FavouriteIcon";
import WatchLater from "./WatchLaterIcon";

const Header = () => {
  return (
    <div className="w-full bg-blue-900 flex justify-between items-center h-20 p-4">
      <Logo />
      <div>
        <FavouriteIcon />
        <WatchLater />
      </div>
    </div>
  );
};
export default Header;
