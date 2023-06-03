import endpoints from "../../common/endpoints";
import { getRequest } from "../../http";

const getUsers = (payload: any) => getRequest(endpoints.usersSearch, payload);

export default getUsers;