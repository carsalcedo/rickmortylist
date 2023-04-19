import React, { useEffect, useState } from 'react'
import Character from './Character';

function NavPage({page, setPage}){
    return (
        <header className='d-flex justify-content-between align-items-center'>
            <p>Page: {page}</p>
            <div>
                {
                    page > 1 &&
                    <button className='btn btn-primary btn-sm me-2' onClick={()=> setPage(page - 1)}>
                        Prev Page
                    </button>
                }
                <button className='btn btn-primary btn-sm' onClick={()=> setPage(page + 1)}>
                    Page {page + 1}
                </button>
            </div>
        </header>
    )
}

function CharacterList() {
    
  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  

  useEffect(() => {
   async function fetchData(){
     const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
     const data = await response.json()
     setLoading(false)
     setCharacter(data.results)
     console.log(data.results);
   }
   fetchData()
  }, [page]);

  

  return (
    <div className='container'>
        <NavPage page={page} setPage={setPage}/>
        {
            loading ? (<h1>loading...</h1>)
            :(<div className='row'>
            {
                character.map(character =>{
                return(
                <div className='col-md-4 mt-4' key={character.id}>
                        <Character character={character}/>
                </div>
                )
                })
            }
            </div>)
        }
        <NavPage page={page} setPage={setPage}/>
    </div>
  )
}

export default CharacterList