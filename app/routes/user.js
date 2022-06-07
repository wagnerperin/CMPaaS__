module.exports = app => {
    const api = app.api.user;

    app
        .route('/user')
        .post(api.create);
}