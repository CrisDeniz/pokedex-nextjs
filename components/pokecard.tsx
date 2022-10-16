import { useEffect, useState } from 'react'
import styles from '../styles/Card.module.css'
import { Pokecard } from '../types/pokecard'
import { Poke } from '../types/poketypes'
import { Species } from '../types/species'

export default function Card(pokemon: Pokecard) {

    const [data , setData] = useState<Species>()

    const URL = `https://pokeapi.co/api/v2/pokemon-species/${pokemon.entry_number}`
    
    async function Fetch() {
        try {
            const response =  await fetch(URL)
            const data = await response.json()
      
            if(!data || !response ) {
              throw new Error("Erro na requisição")
            }
            
            
            setData(data)
            
          } catch {
            
          }
    }

    useEffect(() => {
        Fetch()
    }, [])

    return(
        <a className={styles.card}  href={`/posts/${pokemon.entry_number}/${pokemon.pokemon_species.name}`}>
        <div >
                <div className={styles.imgContainer} style={{backgroundColor: data?.color.name}}>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.entry_number}.png`} alt="" />
                </div>
                <p className={styles.name}>{pokemon.pokemon_species.name}</p>
                <p className={styles.number}>N&#176;{pokemon.entry_number}</p>
        </div>
        </a>
    )
}