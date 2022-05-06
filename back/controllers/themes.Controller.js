const themeModel = require('../models/themes.model');
const ObjectID = require('mongoose').Types.ObjectId;

const addTheme = async (req, res) => {
    const { name } = req.body;
    const createdDate = new Date();
    try {
        const theme = await themeModel.create({ name, createdDate });
        res.status(201).json(theme)
    }
    catch (error) {
        console.log(error);
        res.status(500).send('internal error in DB');
    }
}
const findAll = async (req, res) => {
    const themes = await themeModel.find().select('-__v');
    res.status(200).json(themes);
}
const findOne = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Id unknown');
    }
    await themeModel.findById(id, (err, docs) => {
        if (!err) {
            return res.status(200).json(docs)
        }
        else
            console.log("erreur d'ID");
        return res.status(404).send('Id unknown');
    }).select('-__v');
}

const updateOne =  async(req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Id unknown');
    }
    try {
         await themeModel.findByIdAndUpdate(
            {_id:id},
            {
              $set: {
                  name: req.body.name
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
        await themeModel.remove({_id: id}).exec();
        res.status(200).send('Theme deleted');
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Error removing theme');
    }
}

module.exports = {
    addTheme,
    findOne,
    findAll,
    updateOne,
    deleteOne,
}