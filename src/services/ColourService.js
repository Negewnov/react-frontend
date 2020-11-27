import axios from 'axios';

const COLOUR_API_BASE_URL = "http://localhost:8080/api/v1/colours";

class ColourService {

    getColours(){
        return axios.get(COLOUR_API_BASE_URL);
    }

    createColour(colour){
        return axios.post(COLOUR_API_BASE_URL, colour);
    }

    getColourById(colourId){
        return axios.get(COLOUR_API_BASE_URL + '/' + colourId);
    }

    updateColour(colour, colourId){
        return axios.put(COLOUR_API_BASE_URL + '/' + colourId, colour);
    }

    deleteColour(colourId){
        return axios.delete(COLOUR_API_BASE_URL + '/' + colourId);
    }
}

export default new ColourService()