import endpoints from "../../common/endpoints";
import { getRequest } from "../../http";

const getNewsList = (payload: any) => getRequest(endpoints.newsFeed, payload);

export default getNewsList;