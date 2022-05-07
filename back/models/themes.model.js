const mongoose = require('mongoose');
const themeSchema= new mongoose.Schema(
    {
        name :{
            required : true,
            type : String,
            trim : true
        },
        createdDate:{
            required :true,
            type : Date
        } 
    }
)
const themes=mongoose.model('theme',themeSchema);
module.exports=themes;
