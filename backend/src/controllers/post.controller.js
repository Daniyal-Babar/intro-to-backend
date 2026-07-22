import { Post } from "../models/post.model.js"

const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;

        if (!name || !description || !age) {
            return res.status(400).json({ message: "All Fields are Required !" })
        }

        const post = await Post.create({
            name,
            description,
            age,
        });

        res.status(201).json({
            message: "Post Created Successfully ! ", post
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error !", error
        });
    }
}

const getPosts = async (req,res) =>{
    try {
        const getPosts = await Post.find();

        res.status(200).json(getPosts);

    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error !",error
        });
    }
}

const updatePost = async(req,res) =>{
    try {

        if(Object.keys(req.body).length === 0)
        {
            return res.status(400).json({
                message: "No Data Provided for update"
            });
        }

        const post = await Post.findByIdAndUpdate(req.params.id,req.body,
            {new: true});

        if(!post){
            return res.status(404).json({
                message:"post not found"
            });
        }

        res.status(200).json({
            message:"Post updatation successfull !",post
        });
        
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error !",error
        })
    }
}

const deletePost = async(req,res) =>{
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(404).json({
                message:"Post not found !"
            });
        }

        res.status(200).json({
            message:"Post deleted successfully !"
        })
    } catch (error) {
        res.status(500).json({
            message:"internal server error !",error
        })
    }
}

export {
    createPost,
    getPosts,
    updatePost,
    deletePost,
}