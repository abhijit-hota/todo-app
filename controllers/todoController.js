const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Connect to db
const uri = "mongodb+srv://abhijit:test@todo-trial-pmko8.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//Create schema
let todoSchema = new mongoose.Schema({ task: String });
let TaskModel = mongoose.model('TaskModel', todoSchema);

const todoController = (app) => {

    let urlencodeparser = bodyParser.urlencoded({
        extended: true
    });
    app.get('/todo', (req, res) => {
        TaskModel.find({}, (err, data) => {
            if (err) throw err;
            res.render('todo.ejs',{arr: data});
        });
    });

    app.post('/todo', urlencodeparser, (req, res) => {
        let newTask = TaskModel(req.body).save( (err, data) => {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:task', (req, res) => {
        TaskModel.find({task: req.params.task.replace(/\-/g,' ')}).deleteOne((err, data) => {
            if (err) throw err;
            res.json(data);
        });
    });
}

module.exports = todoController;