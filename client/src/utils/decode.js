import { jwtDecode } from "jwt-decode";

const decode = (token) => {
  const decodedJSON = jwtDecode(token);
  const data = JSON.stringify(decodedJSON);
  const parsedData = JSON.parse(data);

  return parsedData;
};

export default decode;
