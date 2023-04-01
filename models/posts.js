import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    content2: String,
    tag: String,
    image: String,
}, {
    timestamps: true,
});

const Post = mongoose.model("Post", postSchema);


export default Post;