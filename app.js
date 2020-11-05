const dboperations = require('./dboperations')
var DB = require('./dboperations')
var Users = require('./models/users.model')

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

router.route('/users').get((request,response)=>{
    dboperations.getUsers().then(result => {
        response.json(result[0]);
    })
})

router.route('/users/:id').get((request,response)=>{
    dboperations.getUser(request.params.id).then(result => {
        response.json(result[0]);
    })
})

/* Create user*/
router.route('/users').post((request,response)=>{

    let user = {... request.body}
    dboperations.addUser(user).then(result => {
        response.status(201).json(result);
    })
})

router.route('/users/:id').delete((request,response)=>{
    dboperations.deleteUser(request.params.id).then(result => {
        response.json(result);
    })
})

router.route('/users/login').post((request,response)=>{

    let user = {... request.body}
    dboperations.login(user).then(result => {
        response.json(result);
    })
})
/*
router.route('/usuario/deptos/:id').get((request,response)=>{
    dboperations.getDeptoUsuario(request.params.id).then(result => {
        response.json(result[0]);
    })
})
*/
var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is running at ' + port);

dboperations.getUsers().then(result =>{
    console.log(result)
})