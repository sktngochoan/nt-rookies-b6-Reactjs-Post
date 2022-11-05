import { CONFIG } from "./config";
import { PATHS } from "./path";

export const ENDPOINTS = {
    LOGIN: CONFIG.API_URL +PATHS.AUTHOR+ PATHS.LOGIN,
    POSTS: CONFIG.API_URL + PATHS.POSTS,
    DELETEPOSTS: CONFIG.API_URL + PATHS.DELETE
}