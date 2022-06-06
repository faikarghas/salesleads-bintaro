import {verify} from "jsonwebtoken";

export const verifyJwt = (token) => {
    if (token) {
        const verified = verify(token,'L1n+@N9w15es4Jwt');
        return verified;
    }

    return {
        id : 0
    };

}