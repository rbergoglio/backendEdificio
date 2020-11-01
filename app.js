const dboperations = require('./dboperations')
var DB = require('./dboperations')
var Usuarios = require('./models/usuarios.model')

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { request, response } = require('express');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api',router);


router.use((request,response,next)=>{
    console.log('middleware');
    next();

})

router.route('/usuarios').get((request,response)=>{
    dboperations.getUsuarios().then(result => {
        response.json(result[0]);
    })
})

router.route('/usuario/:id').get((request,response)=>{
    dboperations.getUsuario(request.params.id).then(result => {
        response.json(result[0]);
    })
})


var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnit at ' + port);

dboperations.getUsuarios().then(result =>{
    console.log(result)
})