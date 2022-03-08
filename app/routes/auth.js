module.exports = app => {
    const api = app.api.auth;

    app
        .route('/auth')
        .post(api.authenticate);
}