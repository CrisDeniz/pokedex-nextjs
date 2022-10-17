import Image from 'next/image'
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

    function newColor(c : string | undefined) {
        let color 

        c === 'blue' ? color = 'rgb(145, 193, 255)':
        c === 'green' ? color = 'rgb(200, 255, 149)':
        c === 'red' ? color = 'rgb(255, 115, 115)':
        c === 'yellow' ? color = 'rgb(255, 247, 142)':
        c === 'brown' ? color = 'rgb(170, 95, 33)':
        c === 'purple' ? color = 'rgb(168, 95, 252)':
        c === 'black' ? color = 'rgb(10, 10, 10)':
        color = c
        
        return color
    }

    return(
        <a style={{backgroundColor: newColor(data?.color.name)}} className={styles.card} href={`/posts/${pokemon.entry_number}/${pokemon.pokemon_species.name}`}>
        <div >
                <div className={styles.imgContainer} >
                    <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.entry_number}.png`} height={150} width={150} />
                </div>
                <p className={styles.name}>{pokemon.pokemon_species.name}</p>
                <p className={styles.number}>N&#176;{pokemon.entry_number}</p>
        </div>
        </a>
    )
}