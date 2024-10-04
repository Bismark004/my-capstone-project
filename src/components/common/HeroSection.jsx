import background from '../../assets/Poster.png';
import GlowingSearchInput from './GlowingSearchInput'

const HeroSection =( ) => {
    
    return (
        
        <div className="bg-cover bg-center h-80"
          style={{
            backgroundImage: `url(${background})`
          }}>

            
          <GlowingSearchInput/>
            

        </div>
    )
}
export default HeroSection;