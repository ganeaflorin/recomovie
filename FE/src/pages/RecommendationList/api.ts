import endpoints from "../../common/endpoints";
import { getRequest } from "../../http";

const getRecommendation = (payload: any) =>
    getRequest(endpoints.recommendationSystem, payload)

export default getRecommendation;
