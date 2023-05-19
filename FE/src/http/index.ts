import axios from "axios"

export const getRequest = (url: string, params: { [key: string]: string }) =>
    axios.get(url, {
        params
    }).then((response) => { console.log("RESP: ", response); return { response: response.data } })
        .catch((error) => ({ error: { message: error.response.data, status: error.response.status } }))


export const postRequest = (url: string, payload: { [key: string]: string }) =>
    axios.post(url, payload).then((response) => ({ response: response }))
        .catch((error) => ({ error: { message: error.response.data, status: error.response.status } }))


export const patchRequest = (url: string, payload: { [key: string]: string }) =>
    axios.delete(url, payload).then((response) => ({ response }))
        .catch((error) => ({ error: { message: error.response.data, status: error.response.status } }))


export const deleteRequest = (url: string, payload: { [key: string]: string }) =>
    axios.delete(url, { data: payload }).then((response) => ({ response: response.status }))
        .catch((error) => ({ error: { message: error.response.data, status: error.response.status } }))


