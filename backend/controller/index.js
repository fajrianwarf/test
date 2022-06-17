const Post = require('../model/postModel');

const index = async (req, res) => {
    try {
        const article = await Post.find();
        res.json(article);
    } catch (err) {
        res.json({message: err.message})
    }
}

const getOne = async (req, res) => {
    try {
        const article = await Post.findById(req.params.id);
        res.json(article);
    } catch (err) {
        res.json({message: err.message})
    }
}

const addOne = async (req, res) => {
    try {
        const article = new Post(req.body);
        await article.save();
        return res.json({
            status: 'successfully added data',
            data: article
        });
    } catch (err) {
        res.json({message: err.message})
    }
}

const updateOne = async (req, res) => {
    try {
        await Post.findOneAndUpdate({ _id: req.params.id}, { $set: req.body }, { upsert: true, runValidators: true });
        return res.json({message: "Data successfully updated"});
    } catch (err) {
        res.json({message: err.message})
    }
}

const deleteOne = async (req, res) => {
    try {
        const article = await Post.findByIdAndDelete(req.params.id);
        return res.json(article);
    } catch (err) {
        res.json({message: err.message})
    }
}

module.exports = { index, getOne, addOne, updateOne, deleteOne }