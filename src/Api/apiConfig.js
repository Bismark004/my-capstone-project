const apiConfig =  {

    baseUrl : 'https://api.themoviedb.org/3/',
    apiKey : '8daab53e806e1a389e43ee17bc9cdff8',
    originalImage : (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500image : (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`

}
export default apiConfig;