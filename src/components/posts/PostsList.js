import { useEffect, useState } from 'react'
import { getLikes } from '../../services/likeService'
import { getPosts } from '../../services/postService'
import { findTopicById, getTopics } from '../../services/topicService'
import { Post } from './Post'
import { PostSearchBar } from './PostSearchBar'
import { PostTopicBar } from './PostTopicBar'

export const PostsList = () => {
    const [allPosts, setAllPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [allTopics, setAllTopics] = useState([])
    const [allLikes, setAllLikes] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [searchTopicId, setSearchTopicId] = useState('0')

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

    // filters posts depending on search method
    useEffect(() => {
        // if there is no search topic
        if (searchTopicId === '0') {
            // filter by term
            setFilteredPosts(
                allPosts.filter(post =>
                    post.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
            )
        } else {
            // otherwise
            setFilteredPosts(
                // filter by topic
                allPosts.filter(post => {
                    if (searchTopicId === '0') {
                        return true;
                    }
                    return findTopicById(post.topicId, allTopics).id === parseInt(searchTopicId)
                })
            )
        }
    }, [allPosts, allTopics, searchTerm, searchTopicId])


    return <section id='post-list'>

        <PostSearchBar setSearchTerm={setSearchTerm} resetSearch={resetSearchTopic} />
        <PostTopicBar setSearchTopic={setSearchTopicId} resetSearch={resetSearchTerm} topics={allTopics} />

        {filteredPosts.map((post) => {
            return <Post
                post={post}
                topics={allTopics}
                likes={allLikes}
                key={post.id}
            />
        })}
    </section>
}
