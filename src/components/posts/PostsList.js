import { useEffect, useState } from 'react'
import { getLikeByCFK, getLikes } from '../../services/likeService'
import { findPostByUser, getPosts } from '../../services/postService'
import { findTopicById, getTopics } from '../../services/topicService'
import { Post } from './Post'
import { PostSearchBar } from './PostSearchBar'
import { PostTopicBar } from './PostTopicBar'

export const PostsList = ({ author, likedPostsUser }) => {
    const [allPosts, setAllPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [allTopics, setAllTopics] = useState([])
    const [allLikes, setAllLikes] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [searchTopicId, setSearchTopicId] = useState('0')
    const [myPosts, setMyPosts] = useState([])
    const [likedPosts, setLikedPosts] = useState([])

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
        // if there is a likedPostsUser
        if (likedPostsUser) {
            // get and set liked posts
            setLikedPosts(
                allPosts.filter(post => {
                    return getLikeByCFK(likedPostsUser.id, post.id, allLikes)
                })
            )
        }
    }, [allLikes, allPosts, author, likedPostsUser])


    // set filtered posts depending on search method
    useEffect(() => {
        // if there is no search topic
        if (searchTopicId === '0') {
            // and there is an author
            if (author) {
                // filter created posts by term
                setFilteredPosts(
                    myPosts.filter(post =>
                        post.title.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                )
            } else {
                // otherwise, if there is no author
                // if there is a likedPostsUser
                if (likedPostsUser) {
                    // filter liked posts by term
                    setFilteredPosts(
                        likedPosts.filter(post =>
                            post.title.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                    )
                } else {
                    // otherwise, if there is no likedPostsUser
                    // filter all posts by term
                    setFilteredPosts(
                        allPosts.filter(post =>
                            post.title.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                    )

                }
            }
        } else {
            // otherwise, if there is a search topic
            // and there is an author
            if (author) {
                // filter created posts by topic
                setFilteredPosts(
                    myPosts.filter(post => {
                        if (searchTopicId === '0') {
                            return true;
                        }
                        return findTopicById(post.topicId, allTopics)?.id === parseInt(searchTopicId)
                    })
                )
            } else {
                // otherwise, if there is no author
                // if there is a likedPostsUser
                if (likedPostsUser) {
                    // filter liked posts by topic
                    setFilteredPosts(
                        likedPosts.filter(post => {
                            if (searchTopicId === '0') {
                                return true;
                            }
                            return findTopicById(post.topicId, allTopics)?.id === parseInt(searchTopicId)
                        })
                    )
                } else {
                    // otherwise, if there is no likedPostsUser
                    // filter all posts by topic
                    setFilteredPosts(
                        allPosts.filter(post => {
                            if (searchTopicId === '0') {
                                return true;
                            }
                            return findTopicById(post.topicId, allTopics)?.id === parseInt(searchTopicId)
                        })
                    )
                }
            }
        }
    }, [allPosts, allTopics, author, likedPosts, likedPostsUser, myPosts, searchTerm, searchTopicId])


    const renderPosts = () => {
        if (author) {
            return filteredPosts.map((post) => {
                return <Post
                    key={post.id}
                    post={post}
                    topics={allTopics}
                    likes={allLikes}
                    author={author}
                    resetState={resetState}
                />
            })
        } else if (likedPostsUser) {
            return filteredPosts.map((post) => {
                return <Post
                    key={post.id}
                    post={post}
                    topics={allTopics}
                    likes={allLikes}
                    likedPostsUser={likedPostsUser}
                    resetState={resetState}
                />
            })
        } else {
            return filteredPosts.map((post) => {
                return <Post
                    key={post.id}
                    post={post}
                    topics={allTopics}
                    likes={allLikes}
                />
            })
        }

    }



    return <section id='post-list'>

        <PostSearchBar setSearchTerm={setSearchTerm} resetSearch={resetSearchTopic} />
        <PostTopicBar setTopic={setSearchTopicId} resetSearch={resetSearchTerm} topics={allTopics} />

        {renderPosts()}
    </section>
}

// refactor post rendering
// add liked posts view functionality
