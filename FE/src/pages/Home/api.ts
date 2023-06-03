import endpoints from "../../common/endpoints";
import { Languages } from "../../entities/common";
import { getRequest } from "../../http";

const getNewsList = (payload: any) => getRequest(endpoints.newsFeed, payload);

export default getNewsList;