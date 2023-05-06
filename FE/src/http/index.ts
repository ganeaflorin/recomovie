import axios from "axios"

export const getRequest = (url: string, params: { [key: string]: string }) =>
    axios.get(url, {
        params
    }).then((response) => { return { response: response.data } })
        .catch((error) => error)


export const postRequest = (url: string, payload: { [key: string]: string }) =>
    axios.post(url, payload).then((response) => { return { response: response.data } })
        .catch((error) => error)

