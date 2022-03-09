module.exports = app => {
    const api = app.api.map;
    const authApi = app.api.auth;

    app
        .route('/maps')
        .post(authApi.authenticationOptional, api.create)
        .get(api.list);
}