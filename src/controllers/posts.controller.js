import Posts from '../models/posts.model.js'; // Import the Posts model
import { User } from '../models/user.model.js';


// Create a new post
export const createPost = async (req, res) => {
    const postData = req.body;
    const {
        title = postData.Title, // Handle title from either `title` or `Title`
        content = postData.Content, // Handle content from either `content` or `Content`
        Tags = postData.Tags, // Tags can come from `Tags`
        img_url = postData.img_url // Image URL
    } = postData;

    try {
        // Find the user by ID
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create and save the new post document in MongoDB
        const newPost = await Posts.create({
            title: title,
            date: new Date(), // Setting the date to the current date
            content: content,
            tags: Tags,
            coverimg: img_url,
            author: user._id,
            authorName: user.username, // Include the author's username
            authorEmail: user.email // Include the author's email
        });

        res.status(201).json({ message: 'Data received and post created successfully', post: newPost });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "An error occurred while creating the post" });
    }
};

// Get all posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Posts.find(); // Fetches all documents in the Posts collection
        res.status(200).json(posts); // Sends the data back as JSON
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "An error occurred while fetching posts" });
    }
};

export const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Posts.findById(id); // Fetches the post by ID
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post); // Sends the data back as JSON
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ message: "An error occurred while fetching the post" });
    }
};
