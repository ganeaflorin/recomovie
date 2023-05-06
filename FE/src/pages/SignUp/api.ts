import endpoints from "../../common/endpoints";
import { getRequest, postRequest } from "../../http";

const signUp = (payload: any) =>
    postRequest(endpoints.signUp, payload)

export default signUp;
