module.exports = app => {
    const api = app.api.user;

    app
        .route('/users')
        .post(api.create);
}