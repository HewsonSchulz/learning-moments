import './PostSearchBar.css'

export const PostSearchBar = ({ setSearchTerm, resetSearch }) => {
    return <div className='post-bar' id='search-bar'>
        <input
            type='text'
            placeholder='Search By Title'
            id='search-bar__input'
            onChange={(event) => {
                setSearchTerm(event.target.value)
                resetSearch()
            }}
        />
    </div>
}
