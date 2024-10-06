const apiConfig =  {

    baseUrl : 'https://api.themoviedb.org/3/',
    apiKey : '490977fdf68910dda3102d3f35def0aa',
    originalImage : (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500image : (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`

}
export default apiConfig;