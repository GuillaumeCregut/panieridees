const req = require('express/lib/request');
const ideaModel=require('../models/ideas.model');
const themeModel=require('../models/themes.model');
const ObjectID = require('mongoose').Types.ObjectId;

const addIdea=async (req,res)=>{
    const { name,theme,state } = req.body;
    if (!ObjectID.isValid(theme)) {
        return res.status(404).send('Theme Id unknown');
    }
    const createdDate = new Date();
    try {
        const idea = await ideaModel.create({ name, createdDate,theme,state });
        res.status(201).json(idea)
    }
    catch (error) {
        console.log(error);
        res.status(500).send('internal error in DB');
    }
}

const findAll = async (req, res) => {
    const ideas = await ideaModel.find().populate('theme').select('-__v').sort({createdDate:1});
    if(!ideas){
        return res.status(404).send('Ideas not found');
    }
    return res.status(200).json(ideas);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Id unknown');
    }
    try{
        let docs = await ideaModel.findById(id).populate('theme').select('-__v');
        if(docs===null){
            docs=[];
        }
        return res.status(200).json(docs)
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Internal DB Error');
    }
}

const findAllInCart=async(req,res)=>{
    const ideas = await ideaModel.find({state:false}).populate('theme').select('-__v').sort({createdDate:1});
    if(!ideas){
        return res.status(404).send('Ideas not found');
    }
    return res.status(200).json(ideas);
}

const findAllDone=async(req,res)=>{
    const ideas = await ideaModel.find({state:true}).populate('theme').select('-__v').sort({createdDate:1});
    if(!ideas){
        return res.status(404).send('Ideas not found');
    }
    return res.status(200).json(ideas);
}
const updateOne =  async(req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Id unknown');
    }
    try {
         await ideaModel.findByIdAndUpdate(
            {_id:id},
            {
              $set: {
                  name: req.body.name,
                  state:req.body.state,
                  theme: req.body.theme
              }  
            },
            {new:true,upsert:true,setDefaultsOnInsert:true}).select('-__v');
            return res.sendStatus(204);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('error saving modifications');
    }
}

const deleteOne=async (req,res)=>{
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Id unknown');
    }
    try {
        await ideaModel.deleteOne({_id: id}).exec();
        res.status(200).send('Theme deleted');
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Error removing theme');
    }
}

const findByTheme =async (req,res)=>{
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Id unknown');
    }
    const docs=await ideaModel.find({theme:id}).populate('theme').select('-__v').sort({createdDate:1});
    if(docs===null){
        return res.status(404).send('No result');
    }
    return res.status(200).json(docs);
}

module.exports={
    addIdea,
    findOne,
    findAll,
    findAllInCart,
    findAllDone,
    updateOne,
    deleteOne,
    findByTheme
}