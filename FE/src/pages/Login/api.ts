import endpoints from "../../common/endpoints";
import { postRequest } from "../../http";

const login = (payload: any) =>
    postRequest(endpoints.login, payload)

export default login;
