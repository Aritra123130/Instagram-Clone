import { getPosts ,createPost} from "../services/post.api";
import { useContext, useCallback } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("usePost must be used within a PostContextProvider");
    }

    const { loading, setLoading, feed, setFeed } = context;

    const handleGetFeed = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getPosts();
            // assuming API returns array directly or in response.posts
            setFeed(response.posts || response);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [setLoading, setFeed]);

      const handleCreatePost = async (imageFile, caption) => {
        setLoading(true)
        const data = await createPost(imageFile, caption)
        setFeed([ data.post, ...feed ])
        setLoading(false)
    }

    return { loading, feed, handleGetFeed, handleCreatePost };
};