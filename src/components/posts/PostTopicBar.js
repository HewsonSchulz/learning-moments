export const PostTopicBar = ({ setTopic, topics, resetSearch }) => {
    return <select
        id='topic-bar'
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
            <option key={topic.id} value={topic.id}>
                {topic.name}
            </option>
        )}

    </select>
}
