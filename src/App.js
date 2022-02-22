import { useEffect, useState } from 'react';
import './App.scss';
import Post from './components/Post/Post';
import getPosts from './helper_functions/axios'
import Pagination from './Pagination/Pagination';

function App() {
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(0)




  useEffect(() => {

    const loadPosts = async () => {
      const res = await getPosts()
      setPosts(res.data);
    }

    loadPosts()

  }, [])





  return (
    <div className="App">


      <Pagination
        data={posts} numOfPostsInAPage={5} currentPageNumber={currentPageNumber} pages={pages} setPages={setPages}
        setNumOfPostsInAPage={setCurrentPageNumber}
        setCurrentPageNumber={setCurrentPageNumber}
      >

        {pages[currentPageNumber]?.map(post => (
          <Post post={post} key={post.id} />
        ))}

      </Pagination>


    </div>
  );
}

export default App;
