const PRODUCTION_ENDPOINT = "http://91.99.180.11:5000/api";
// const DEVELOPMENT_ENDPOINT = "http://localhost:5000/api";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || PRODUCTION_ENDPOINT;

export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const LOGIN_URL = `${BASE_URL}/auth/login`;

export const TOPICS_ABD_SUBTOPICS_URL = `${BASE_URL}/topics/with-subtopics`;
export const TOPICS_URL = `${BASE_URL}/topics`;

export const SUB_TOPICS_URL = `${BASE_URL}/subtopics`;


export const PROGRESS_URL = `${BASE_URL}/progress`;

export const USER_UPDATE_URL = `${BASE_URL}/users/update`;