const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema ({
    title : {type : String, required : true},
    content : {type : String, required : true},
    token : {type : Number, required : true}
})

module.exports = mongoose.model('Chapters', chapterSchema)
