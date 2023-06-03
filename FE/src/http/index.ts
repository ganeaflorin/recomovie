import axios from "axios"

export const getRequest = (url: string, params?: { [key: string]: string }) =>
    axios.get(url, {
        params
    }).then((response) => { return { response: response.data } })
        .catch((error) => ({ error: { message: error.response.data, status: error.response.status } }))


export const postRequest = (url: string, payload: { [key: string]: string }) =>
    axios.post(url, payload).then((response) => ({ response: response }))
        .catch((error) => ({ error: { message: error.response.data, status: error.response.status } }))


export const patchRequest = (url: string, payload: { [key: string]: string }) =>
    axios.patch(url, payload).then((response) => ({ response }))
        .catch((error) => { return ({ error: { message: error.response, status: error.response } }) })


export const deleteRequest = (url: string, payload: { [key: string]: string }) =>
    axios.delete(url, { data: payload }).then((response) => ({ response: response.status }))
        .catch((error) => ({ error: { message: error.response.data, status: error.response.status } }))


