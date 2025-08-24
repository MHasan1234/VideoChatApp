let IS_PROD = true;

const server = IS_PROD ?
    
     "https://conferabackend.onrender.com" :

     "http://localhost:8000"

export default server;