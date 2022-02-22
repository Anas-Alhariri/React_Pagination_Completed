import axios from "axios"

const url = 'https://jsonplaceholder.typicode.com/posts'

const getPosts = async () => {
    return await axios.get(url)
}


export default getPosts;