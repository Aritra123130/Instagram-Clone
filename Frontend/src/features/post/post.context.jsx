import { createContext, useState } from "react";

// fallback shape helps avoid undefined checks when context consumer is used outside provider
export const PostContext = createContext({
  loading: false,
  setLoading: () => {},
  post: null,
  setPost: () => {},
  feed: [],
  setFeed: () => {}
});


export const PostContextProvider = ({ children }) => {

    const [ loading, setLoading ] = useState(false)
    const [ post, setPost ] = useState(null);
    const [ feed, setFeed ] = useState([]);


    return (
        <PostContext.Provider value={{ loading, setLoading, post, setPost, feed, setFeed }}>
            {children}
        </PostContext.Provider>
    )

}