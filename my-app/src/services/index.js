import { ENDPOINTS } from "../appConstants/endpoint"
import API from "./API"

const {get, del, put, post} = API
export const getPosts = async () => {
    return get(ENDPOINTS.POSTS)
}
export const getPostDetail = async (id) => {
    return get(`${ENDPOINTS.POSTS}/${id}`)
}
export const createPost = async (data) => {
    return post(ENDPOINTS.POSTS,data);
}
export const updatePost = async (id,data) => {
    return put(`${ENDPOINTS.POSTS}/${id}`,data);
}
export const deletePost = async (id) => {
    return del(`${ENDPOINTS.POSTS}/${id}`);
}
export const login = async (username,password) => {
    return get(`${ENDPOINTS.LOGIN}?username=${username}&&password=${password}`);
}