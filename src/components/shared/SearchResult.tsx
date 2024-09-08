import { searchPosts } from '@/lib/appwrite/api'
import { Models } from 'appwrite'
import React from 'react'
import Loader from './Loader'
import GridPostList from './GridPostList'



type SearchResultsProps = {
    isSearchFetching: boolean,
    searchPosts: Models.Document[]
}

const SearchResults = ({ isSearchFetching, searchPosts}:
    SearchResultsProps) => {
        if (isSearchFetching) return <Loader />

        if (searchPosts && searchPosts.documents.length > 0) {
            return <GridPostList posts ={searchPosts.documents} />
        }
        return (
            <p className='text-light-4 mt-10 text-center w-full'>
                No results found
            </p>
        )
    }



// const SearchResult = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

export default SearchResults
