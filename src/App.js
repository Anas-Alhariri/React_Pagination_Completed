import { useEffect, useState } from 'react';
import './App.scss';
import Post from './components/Post/Post';
import getPosts from './helper_functions/axios'

function App() {
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState([]);
  const [numOfPostsInAPage, setNumOfPostsInAPage] = useState(1)
  const [currentPageNumber, setCurrentPageNumber] = useState(0)


  const dividePages = () => {
    let newPostsInPage = []
    let tempArray = []

    if (posts.length > 0) {

      let counter = 1

      for (const item of posts) {

        tempArray.push(item)

        if (counter >= numOfPostsInAPage || posts.indexOf(item) === posts.length - 1) {
          counter = 1
          newPostsInPage.push([...tempArray])
          tempArray = []
        } else {
          counter++;
        }
      }

      setPages([...newPostsInPage])
      setCurrentPageNumber(0)
      // console.log('pages :', pages);
    }
  }



  const changePageNumberHandler = (e) => {
    let pageNumber = 0;

    if (e.target.tagName === 'SELECT') {
      pageNumber = +e.target?.value
    } else {
      pageNumber = +e.target.innerText - 1
    }

    setCurrentPageNumber(pageNumber)
  }


  const changeNumberOfPostsInAPage = (e) => {
    const numberOfPosts = +e.target.value
    setNumOfPostsInAPage(numberOfPosts)
    console.log('numberOfPosts :', numberOfPosts);
    // console.log("Number of posts changed")
  }

  useEffect(() => {
    setNumOfPostsInAPage(5)

    const loadPosts = async () => {
      const res = await getPosts()
      setPosts(res.data);
    }

    loadPosts()


    return () => {
    }
  }, [])

  useEffect(() => {
    dividePages()
    // console.log('pages :', pages);

  }, [posts, numOfPostsInAPage])

  useEffect(() => {
    // console.log('pages :', pages);
  }, [pages])




  return (
    <div className="App">

      <label htmlFor="pageNumber">Page Number: </label>
      <select style={{ width: '100px' }} name="pageNumber" id="pageNumber" value={currentPageNumber} onChange={changePageNumberHandler}>
        {pages?.map((item, index) => {
          return <option value={index} key={index}>{index + 1}</option>
        })}
      </select>

      <br />

      <label htmlFor="postsInAPage">Number of Posts in a Page: </label>
      <select style={{ width: '100px' }} name="postsInAPage" id="postsInAPage" value={numOfPostsInAPage} onChange={changeNumberOfPostsInAPage}>
        {posts?.map((item, index) => {
          return <option value={index + 1} key={index}>{index + 1}</option>
        })}
      </select>
      <br />
      <br />

      {pages[currentPageNumber]?.map(post => (
        <Post post={post} key={post.id} />
      ))}

      <ul className='pages-nav'>
        {pages?.map((pageNumber, index) => (
          <li key={index}><a onClick={changePageNumberHandler} href="!#">{index + 1}</a></li>
        ))}
      </ul>

    </div>
  );
}

export default App;
