import jwt_decode from "jwt-decode";

export const decodeJwt = (token) => {
    if (token) {
        const decoded = jwt_decode(token);
        return decoded;
    }

}