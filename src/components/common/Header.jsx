import Logo from './Logo';
import WatchLater from './WatchLaterIcon';
import FavouriteIcon from './FavouriteIcon';
const Header = () => {
    return (
        <div className=" bg-blue-900 flex h-20">
           <Logo/>
           <WatchLater/>
           <FavouriteIcon/>
       </div>
    )
}
export default Header;