import endpoints from "../../common/endpoints";
import { postRequest } from "../../http";

const signUp = (payload: any) =>
    postRequest(endpoints.signUp, payload)

export default signUp;
