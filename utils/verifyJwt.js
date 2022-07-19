import {verify} from "jsonwebtoken";

export const verifyJwt = (token) => {
    if (token) {
        return verify(token,'L1n+@N9w15es4Jwt',function(err,decoded){
            if (err) {
                return false
            } else {
                return decoded
            }
        });
    } else {
        return false;
    }

}