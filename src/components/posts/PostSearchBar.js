import './PostSearchBar.css'

export const PostSearchBar = ({ setSearchTerm, resetSearch }) => {
	return (
		<>
			<input
				type='text'
				placeholder='Search By Title'
				id='search-bar__input'
				onChange={(event) => {
					setSearchTerm(event.target.value)
					resetSearch()
				}}
			/>
		</>
	)
}
