import React,{useState,useRef} from 'react'
import { usePost } from '../hook/usePost';
import { useNavigate } from 'react-router-dom';
const CreatePost = () => {
      const navigate = useNavigate()
    const [caption, setcaption] = useState("");
    const postImage = useRef(null);
     const { loading, handleCreatePost } = usePost()

    async function handleSubmit(e) {
        e.preventDefault()
        const file = postImage.current.files[ 0 ]

        await handleCreatePost(file,caption)

        navigate('/')

    }

    if(loading){
        return (
            <main>
                <h1>creating post</h1>
            </main>
        )
    }

  return (
    <main className="createpostpage">
        <div className="form-container">
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Caption" value={caption} onChange={(e) => setcaption(e.target.value)} />
                <input ref={postImage} type="file" name='postImage'/>
                <button type="submit">Post</button>
            </form>
        </div>
    </main>
  )
}

export default CreatePost
