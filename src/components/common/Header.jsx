import Logo from './Logo';
import FavouriteIcon from './FavouriteIcon';
import WatchLater from './WatchLaterIcon';

const Header = () => {
    return (
        <div className="w-full bg-blue-900 flex h-20">
            <Logo/>
            <FavouriteIcon/>
            <WatchLater/>
            
        </div>
    )
}
export default Header;