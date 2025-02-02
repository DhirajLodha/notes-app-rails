import { jwtDecode } from "jwt-decode";

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiRGhpcmFqIn0.FvokC1Vq72_zSdF-2eSdB-7sRnG0G80NAU3uLSJH_XU';
const response = jwtDecode(token)
console.log('Response: ', response);
