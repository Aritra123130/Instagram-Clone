import axios from 'axios';


const api  = axios.create({
    baseURL:    'http://localhost:3000/api/post',
    withCredentials:true
})


export async function getPosts(){
    // backend route is mounted at /api/posts and defines `/feed`
    // avoid repeating "posts" in the path which caused 404
    const response = await api.get('/feed');
    return response.data;
}

export async function createPost(imageFile, caption){
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('caption', caption);
    const response = await api.post('/', formData);
    return response.data;
}