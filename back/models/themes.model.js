
const Joi=require('Joi');

const validate=(data,forCreation=true)=>{
    const presence=forCreation ? 'required' : 'optionnal';
    return Joi.object({

    }).validate(data,{abortEarly: false}).error;
}

const findAll=()=>{

};

const findOne=(id)=>{

};

const addOne=(data)=>{

};

const updateOne=(data, id)=>{

};

const deleteOne=(id)=>{

};

module.exports ={
    findAll,
    findOne,
    addOne,
    updateOne,
    deleteOne
}