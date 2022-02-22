import React, { useEffect, useState } from 'react'
import './Pagination.scss'

const Pagination = (props) => {
    const [numOfPostsInAPage, setNumOfPostsInAPage] = useState(5)




    const dividePages = (numOfPostsInAPage) => {
        let newPostsInPage = []
        let tempArray = []

        if (props.data.length > 0) {

            let counter = 1

            for (const item of props.data) {

                tempArray.push(item)

                if (counter >= numOfPostsInAPage || props.data.indexOf(item) === props.data.length - 1) {
                    counter = 1
                    newPostsInPage.push([...tempArray])
                    tempArray = []
                } else {
                    counter++;
                }
            }

            props.setPages([...newPostsInPage])
            props.setCurrentPageNumber(0)
        }
    }



    const changePageNumberHandler = (e) => {
        let pageNumber = 0;

        if (e.target.tagName === 'SELECT') {
            pageNumber = +e.target?.value
        } else {
            pageNumber = +e.target.innerText - 1
        }

        props.setCurrentPageNumber(pageNumber)
    }


    const changeNumberOfPostsInAPage = (e) => {
        const numberOfPosts = +e.target.value
        setNumOfPostsInAPage(numberOfPosts)
        dividePages(numberOfPosts)
        console.log('numberOfPosts :', numberOfPosts);
    }

    useEffect(() => {
        setNumOfPostsInAPage(props.numOfPostsInAPage)

        return () => {
        }
    }, [])

    useEffect(() => {
        setNumOfPostsInAPage(props.numOfPostsInAPage)
        dividePages(props.numOfPostsInAPage)

    }, [props.data, props.numOfPostsInAPage])

    useEffect(() => {
    }, [props.pages])









    return (
        <div>
            <label htmlFor="pageNumber">Page Number: </label>
            <select style={{ width: '100px' }} name="pageNumber" id="pageNumber" value={props.currentPageNumber} onChange={changePageNumberHandler}>
                {props.pages?.map((_item, index) => {
                    return <option value={index} key={index}>{index + 1}</option>
                })}
            </select>

            <br />

            <label htmlFor="postsInAPage">Number of Posts in a Page: </label>
            <select style={{ width: '100px' }} name="postsInAPage" id="postsInAPage" value={numOfPostsInAPage} onChange={changeNumberOfPostsInAPage}>
                {props.data?.map((_item, index) => {
                    return <option value={index + 1} key={index}>{index + 1}</option>
                })}
            </select>
            <br />
            <br />


            {props.children}



            <ul className='pages-nav'>
                {props.pages?.map((_pageNumber, index) => (
                    <li key={index}><a onClick={changePageNumberHandler} href="!#">{index + 1}</a></li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination