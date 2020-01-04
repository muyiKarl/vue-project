const getters = {
    // user
    token: state => state.user.token,

    // permission
    permission_routes: state => state.permission.routes
};
export default getters;