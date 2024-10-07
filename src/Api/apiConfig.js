const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '6601fa15c9052bc1fd6508661d601719',
    originalImage: (imgPath) => {
      if (!imgPath) {
        console.error('Invalid image path for originalImage');
        return '';
      }
      return `https://image.tmdb.org/t/p/original/${imgPath}`;
    },
    w500image: (imgPath) => {
      if (!imgPath) {
        console.error('Invalid image path for w500image');
        return '';
      }
      return `https://image.tmdb.org/t/p/w500/${imgPath}`;
    }
  };
  
  export default apiConfig;