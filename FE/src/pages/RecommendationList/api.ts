import endpoints from "../../common/endpoints";
import { getRequest, postRequest } from "../../http";

const getRecommendation = (payload: any) =>
    getRequest(endpoints.recommendationSystem, payload);

export const savePlaylist = (payload: any) => postRequest(endpoints.savePlaylist, payload);

export default getRecommendation;
