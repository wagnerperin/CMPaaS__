const app = require('./conf/express');
const config = require('./conf/config');

app.listen(config.PORT, config.HOST, ()=>{
    console.log(`App listen on http://${config.HOST}:${config.PORT}`);
});