import React from 'react';
import { useCookies } from 'react-cookie';
import { isAssertEntry } from 'typescript';
import SongDisplay from './SongDisplay';


// musician will enter a song name (to start - later we will add more fields for search query)
// will send a fetch get request to spotify api with access token and all that (which is in the cookies)
// will display the search results and let user select one
// then send a fetch post request to backend to add this track to the musician's song list

const AddSong = () => {
  const [cookies, setCookie] = useCookies();

  const [searchField, setSearchField] = React.useState({
    searchQuery: '',
  })

  const [songsData, setSongData] = React.useState({
    songsArr:[],
  })
  const onSearchFieldChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchField({searchQuery: e.target.value})
  } 

  const searchSong = (e:React.SyntheticEvent) => {
    e.preventDefault();
    console.log('target is: ',e.target);
    const { searchQuery } = searchField;

    //replace spaces with '%20'
    //replace apostrophe with '%27'
    const searchQueryClean = searchQuery.replace(' ', '%20').replace("'", '%27');

    const accessToken = cookies.access;

    // send fetch request
    const uri = 'https://api.spotify.com/v1/search' + `?q=${searchQueryClean}&type=track&limit=10`;

    const options = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+ accessToken
      }
    }

    fetch(uri, options)
    .then(response => response.json())
    .then(data => {
      console.log('response datums are: ', data.tracks.items.map((entry: any) => 'name is ' + entry.name + '\nspotify_id is ' + entry.id + '\nartist name is ' + entry.artists[0].name + '\nartist id is ' + entry.artists[0].id + '\nalbum name is ' + entry.album.name + '\npopularity is '+ entry.popularity + '\npreview url is ' + entry.preview_url))
      for(let track of data.tracks.items){
        // it seems that these are ordered by decreasing popularity!
        console.log('the track name is ', track.name + ' and the (first-listed) artist is ' + track.artists[0].name)
        setSongData({songsArr: [...songsData.songsArr,<SongDisplay key={track.external_ids.isrc} title={track.name} artist={track.artists[0].name} genre='unknown'/>]})
      }
    })
  }

  return(
    <div className='song=div'>
    <div className='add-song'>
      <form className='my-4 rounded'>
        <label htmlFor='song-search'>Search Spotify for a song: </label>
        <input type='search' name='song-search' required className='border border-blue-700 rounded' value={searchField.searchQuery} onChange={onSearchFieldChange}></input>
        <input type='button' name='song-search' value='Search' onClick={searchSong} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow'></input>
      </form>
    </div>
    <div className='display-song'>
      {songsData.songsArr}
    </div>
    </div>
  )
}

export default AddSong;