const ADMIN_TOKEN = 'Admin-Token'

export function getToken() {
    return localStorage.getItem(ADMIN_TOKEN);
}
export function setToken(token) {
    return localStorage.setItem(ADMIN_TOKEN, token);
}