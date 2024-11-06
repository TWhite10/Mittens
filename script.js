import axios from "axios";
const API_KEY =
    "live_OBDjG8qEZoYQmlIbzIr1QlQKJwcKigRRd4QneSkNdhpO9Nf4haxFN0AIBsnWh1Gf";
    axios.defaults.headers.common['x-api-key']= API_KEY;

const catImg = document.getElementById("catImg")
    //press butten to get a random cat suggession 
   export  async function getRandomCatImg() {
        try{
             const response = await axios.get("https://api.thecatapi.com/v1/images/search");
        
        return response.data[0].url;
        }
        catch (error) {
            console.error(`Error getting imaage :`, error);
            throw error;
          }

       
      
    }