import axios from "axios"


export const axiosClient = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`
})

export const getNotes = async (url) => {
    const {data} = await axiosClient.get(url)
    return data
}

export const getNotesArchived = async (url) => {
    const {data} = await axiosClient.get(url)
    return data;
}

export const enableOrDisabledNote = async (url, archived) => {
    await axiosClient.put(url, {archived: archived})
}

export const updateNote = async (url, note, slug) => {
    await axiosClient.put(`${url}/${slug}`, note)
}

export const createNote = async (url, note) => {
    await axiosClient.post(url, note)
}

export const deleteNote = async (url, slug) => {
    const {data} = await axiosClient.patch(`${url}/${slug}`)
    return data
}

export const getCategories = async (url) => {
    const {data}= await axiosClient.get(url)
    return data
}

export const createACategory = async (url, category) => {
    await axiosClient.post(url, category)
}
export const getNotesByCategory = async (url) => {
    const {data} = await axiosClient.get(url)
    return data
}