export const PostTopicBar = ({ setSearchTopic, topics, resetSearch }) => {
    return <select
        id='topic-bar'
        onChange={(event) => {
            setSearchTopic(event.target.value)
            resetSearch()
        }}>

        <option value='0'>
            Search By Topic
        </option>

        {topics.map((topic) =>
            <option key={topic.id} value={topic.id}>
                {topic.name}
            </option>
        )}

    </select>
}
