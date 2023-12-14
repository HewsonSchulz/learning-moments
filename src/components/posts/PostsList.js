import { useEffect, useState } from 'react'
import { getLikes } from '../../services/likeService'
import { findPostByUser, getPosts } from '../../services/postService'
import { findTopicById, getTopics } from '../../services/topicService'
import { Post } from './Post'
import { PostSearchBar } from './PostSearchBar'
import { PostTopicBar } from './PostTopicBar'

export const PostsList = ({ author }) => {
    const [allPosts, setAllPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [allTopics, setAllTopics] = useState([])
    const [allLikes, setAllLikes] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [searchTopicId, setSearchTopicId] = useState('0')
    const [myPosts, setMyPosts] = useState([])

    // recalls all data from database
    const resetState = () => {
        getPosts().then((posts) => {
            setAllPosts(posts)
        })
        getTopics().then((topics) => {
            setAllTopics(topics)
        })
        getLikes().then((likes) => {
            setAllLikes(likes)
        })
    }
    const resetSearchTerm = () => {
        setSearchTerm('')
    }
    const resetSearchTopic = () => {
        setSearchTopicId('0')
    }

    // initial render
    useEffect(() => {
        resetState()
    }, [])

    useEffect(() => {
        // if there is an author
        if (author) {
            // get and set created posts
            setMyPosts(
                allPosts.filter(post => {
                    return findPostByUser(post.userId, allPosts)?.userId === author.id
                })
            )
        }
    }, [allPosts, author])


    // set filtered posts depending on search method
    useEffect(() => {
        // if there is no search topic
        if (searchTopicId === '0') {
            // and there is no author
            if (!author) {
                // filter all posts by term
                setFilteredPosts(
                    allPosts.filter(post =>
                        post.title.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                )
            } else {
                // otherwise, if there is an author
                // filter created posts by term
                setFilteredPosts(
                    myPosts.filter(post =>
                        post.title.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                )
            }
        } else {
            // otherwise, if there is a search topic
            // and there is no author
            if (!author) {
                // filter all posts by topic
                setFilteredPosts(
                    allPosts.filter(post => {
                        if (searchTopicId === '0') {
                            return true;
                        }
                        return findTopicById(post.topicId, allTopics)?.id === parseInt(searchTopicId)
                    })
                )
            } else {
                // otherwise, if there is an author
                // filter created posts by topic
                setFilteredPosts(
                    myPosts.filter(post => {
                        if (searchTopicId === '0') {
                            return true;
                        }
                        return findTopicById(post.topicId, allTopics)?.id === parseInt(searchTopicId)
                    })
                )
            }
        }
    }, [allPosts, allTopics, author, myPosts, searchTerm, searchTopicId])


    return <section id='post-list'>

        <PostSearchBar setSearchTerm={setSearchTerm} resetSearch={resetSearchTopic} />
        <PostTopicBar setTopic={setSearchTopicId} resetSearch={resetSearchTerm} topics={allTopics} />

        {!author
            ? filteredPosts.map((post) => {
                return <Post
                    post={post}
                    topics={allTopics}
                    likes={allLikes}
                    key={post.id}
                />
            })
            : filteredPosts.map((post) => {
                return <Post
                    post={post}
                    topics={allTopics}
                    likes={allLikes}
                    key={post.id}
                    author={author}
                    resetState={resetState}
                />
            })}
    </section>
}
