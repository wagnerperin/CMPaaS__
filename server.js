const app = require('./conf/express');
const config = require('./conf/config');
const database = require('./conf/database');
database.conect(config.DBURI);

app.listen(config.PORT, config.HOST, ()=>{
    console.log(`App listen on http://${config.HOST}:${config.PORT}`);
});