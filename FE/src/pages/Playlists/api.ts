import endpoints from "../../common/endpoints";
import { deleteRequest, getRequest } from "../../http";

const getUserPlaylists = (payload: any) => getRequest(endpoints.userPlaylists, payload);

export const deleteUserPlaylist = (payload: any) => deleteRequest(endpoints.playlists, payload);

export default getUserPlaylists;