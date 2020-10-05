let express = require('express');
let path = require("path");
let routes = require('./routes');

var app = express();

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'ejs');

app.use(routes);

app.listen(app.get("port"), function(){
    console.log("server started on port " + app.get("port"));
});