module.exports = app => {
    const api = app.api.group;
    const authApi = app.api.auth;

    app
        .route('/groups')
        .post(authApi.authenticationRequired, api.create)
        .get(authApi.adminRequired, api.list);
}