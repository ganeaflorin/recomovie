import endpoints from "../../common/endpoints";
import { getRequest } from "../../http";

const getConfirmationToken = (payload: any) =>
    getRequest(endpoints.confirmationToken, payload)

export default getConfirmationToken;
