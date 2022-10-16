import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Pokecard } from "../../../types/pokecard"
import styles from  "../../../styles/Details.module.css" 
import Image from "next/image"
import { Poke } from "../../../types/poketypes"
import { Pokemon } from "../../../types/pokemon"
import Header from "../../../components/header"




  export async function getStaticPaths () {


    const response = await fetch(`https://pokeapi.co/api/v2/pokedex/1`)

    const data = await response.json()
    
    const paths = data.pokemon_entries.map((pokemon : Pokecard) => {
        return {
            params: {
                id : `${pokemon.entry_number}`,
                name: `${pokemon.pokemon_species.name}`
            }
        }
    })
    return {
      paths,
      fallback: false, 
    }
  }

  export async function getStaticProps(context: { params: any }) {

    const {params} = context

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}/`)
    const responseTwo = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${params.id}/`)

    const data = await response.json()
    const data2 = await responseTwo.json()
    return {
      // Passed to the page component as props
      props: {
        data,
        data2
      }
    }
  }

export default function Details({data, data2}: {data: Poke , data2: { color : { name : string}}}) {
    

  

    return(
      
        <div className={styles.container} >
           <div className={styles.title}>
               <div className={styles.imgContainer} style={{ backgroundColor: data2.color.name}}>
                <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data?.id}.png`} width={210} height={210} />
               </div>
                <h2>{data?.name}</h2>
                <div className={styles.types}>
                  <span>{data?.types?.[0].type.name}</span>
                  
                  {data?.types?.[1]?.type.name  
                    ?<span>{data?.types?.[1]?.type.name}</span>
                    :null
                  }
                
                </div>
                <div className={styles.stats}>
                   
                   <div className={styles.lineOne}>
                    <div>
                      <p>Hp</p>
                      <p>{data.stats[0].base_stat}</p>
                    </div>
                    <div>
                      <p>Atk</p>
                     <p>{data.stats[1].base_stat}</p>
                    </div>
                    <div>
                      <p>Def</p>
                     <p>{data.stats[2].base_stat}</p>
                    </div>
                   </div>
                   <div className={styles.lineTwo}>
                   <div>
                     <p>Spc.Atk</p>
                     <p>{data.stats[3].base_stat} </p>
                    </div>
                    <div>
                      <p>Spc.Def</p>
                     <p>{data.stats[4].base_stat}</p>
                    </div>
                    <div>
                    <p>Spd</p>
                     <p>{data.stats[5].base_stat}</p>
                    </div>
                   </div>
                    
                    
                </div>
           </div>
           
        </div>
    )
}