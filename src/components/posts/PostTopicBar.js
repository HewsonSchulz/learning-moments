import './PostSearchBar.css'

export const PostTopicBar = ({ setTopic, topics, resetSearch, topicId }) => {
    return <div className='post-bar'>
        <select
            id='topic-bar'
            value={topicId}
            onChange={(event) => {
                setTopic(event.target.value)
                if (resetSearch) {
                    resetSearch()
                }
            }}>

            <option value='0'>
                {resetSearch ? 'Search By Topic' : 'Select Topic'}
            </option>

            {topics.map((topic) =>
                <option
                    key={topic.id}
                    value={topic.id}
                >
                    {topic.name}
                </option>
            )}

        </select>
    </div>
}
