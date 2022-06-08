module.exports = app => {
    const api = app.api.user;
    const authApi = app.api.auth;

    app
        .route('/user')
        .post(api.create)
        .get(authApi.authenticationRequired, api.list);
}