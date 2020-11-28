import axios from 'axios';

const MEMBERSHIP_API_BASE_URL = "http://localhost:8080/api/v1/memberships";

class MembershipService {

    getMemberships(){
        return axios.get(MEMBERSHIP_API_BASE_URL);
    }

    createMembership(membership){
        return axios.post(MEMBERSHIP_API_BASE_URL, membership);
    }

    getMembershipById(membershipId){
        return axios.get(MEMBERSHIP_API_BASE_URL + '/' + membershipId);
    }

    updateMembership(membership, membershipId){
        return axios.put(MEMBERSHIP_API_BASE_URL + '/' + membershipId, membership);
    }

    deleteMembership(membershipId){
        return axios.delete(MEMBERSHIP_API_BASE_URL + '/' + membershipId);
    }
}

export default new MembershipService()