import axios from 'axios';

const MEMBERSHIP_API_BASE_URL = "http://localhost:8080/api/v1/memberships";

class MembershipService {

    getMemberships(){
        return axios.get(MEMBERSHIP_API_BASE_URL);
    }

    createMembership(personId,groupID){
        return axios.post(MEMBERSHIP_API_BASE_URL + '/' + personId, groupID);
    }

    getMembershipsByPersonId(personId){
        return axios.get(MEMBERSHIP_API_BASE_URL + '/' + personId);
    }

    updateMembership(membership, membershipId){
        return axios.put(MEMBERSHIP_API_BASE_URL + '/' + membershipId, membership);
    }

    deleteMembership(membershipId){
        return axios.delete(MEMBERSHIP_API_BASE_URL + '/' + membershipId);
    }
}

export default new MembershipService()