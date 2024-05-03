const mongoose = require('mongoose');

const flashCardSchema = new mongoose.Schema({
  question: {type : String, required : true},
  answer : {type : String, required : true}
});

const coursesSchema = new mongoose.Schema ({
    title : {type : String, required : true},
    description : {type : String, required : true},
    chapters : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapters' ,default: []}],
    summary : {
        type: [{
            title: {type : String, required : true},
            summary : {type : String, required : true}
        }],
        default: []
    },
    flashCards : {
        type: [{
            title: {type : String, required : true},
            flashcards : {type : [flashCardSchema] , required : true}
        }],
        default: []
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
})

module.exports = mongoose.model('Courses', coursesSchema)