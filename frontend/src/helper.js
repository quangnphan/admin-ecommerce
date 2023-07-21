import jwt from "jsonwebtoken";

const isValidToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);//This should be fetched from the backend api
    return decodedToken.exp > Date.now() / 1000;
  } catch (error) {
    return false;
  }
};

export default isValidToken;