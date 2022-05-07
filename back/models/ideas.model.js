const mongoose = require('mongoose');
const ideaSchema= new mongoose.Schema(
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
        theme:{
            type : mongoose.Schema.Types.ObjectId, ref:'theme',
            required: true
        }, 
        state:{
            required:true,
            default: false,
            type : Boolean
        }
    }
)
const ideas=mongoose.model('idea',ideaSchema);
module.exports=ideas;
