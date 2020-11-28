import axios from 'axios';

const PERSON_API_BASE_URL = "http://localhost:8080/api/v1/testassets";

class TestassetService {

    getTestassets(){
        return axios.get(PERSON_API_BASE_URL);
    }

    createTestasset(testasset){
        return axios.post(PERSON_API_BASE_URL, testasset);
    }

    getTestassetById(testassetId){
        return axios.get(PERSON_API_BASE_URL + '/' + testassetId);
    }

    updateTestasset(testasset, testassetId){
        return axios.put(PERSON_API_BASE_URL + '/' + testassetId, testasset);
    }

    deleteTestasset(testassetId){
        return axios.delete(PERSON_API_BASE_URL + '/' + testassetId);
    }
}

export default new TestassetService()