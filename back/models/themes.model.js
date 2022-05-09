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
        }, 
        color:{
            required: true,
            type : String
        }
    }
)
const themes=mongoose.model('theme',themeSchema);
module.exports=themes;
