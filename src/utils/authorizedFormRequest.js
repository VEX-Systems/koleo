import formRequest from "./formRequest.js";

const authorizedFormRequest = async (endpoint, accessToken, body = null) => {
    return formRequest(endpoint, body, accessToken);
};

export default authorizedFormRequest;
