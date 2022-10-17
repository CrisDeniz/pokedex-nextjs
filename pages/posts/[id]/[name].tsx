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
    
  function newColor(c : string | undefined) {
    let color 

    c === 'blue' ? color = 'rgb(145, 193, 255)':
    c === 'green' ? color = 'rgb(138, 182, 36)':
    c === 'red' ? color = 'rgb(255, 115, 115)':
    c === 'yellow' ? color = 'rgb(219, 197, 0)':
    c === 'brown' ? color = 'rgb(170, 95, 33)':
    c === 'purple' ? color = 'rgb(168, 95, 252)':
    c === 'black' ? color = 'rgb(10, 10, 10)':
    c === 'white' ? color = 'rgb(220, 220, 220)':
    color = c
    
    return color
}
  
  function newTypeColor(type : string | undefined) {
    let newTypeColor

    type === 'poison' ? newTypeColor = 'rgb(177, 93, 255)':
    type === 'grass' ? newTypeColor = 'rgb(138, 190, 36)':
    type === 'bug' ? newTypeColor = 'rgb(172, 180, 2)':
    type === 'fighting' ? newTypeColor = 'rgb(134, 49, 0)':
    type === 'electric' ? newTypeColor = 'rgb(255, 208, 0)':
    type === 'dragon' ? newTypeColor = 'rgb(124, 76, 255)':
    type === 'ghost' ? newTypeColor = 'rgb(66, 45, 126':
    type === 'fire' ? newTypeColor = 'rgb(255, 115, 115)':
    type === 'dark' ? newTypeColor = 'rgb(68, 25, 0)':
    type === 'fairy' ? newTypeColor = 'rgb(247, 159, 255)':
    type === 'ground' ? newTypeColor = 'rgb(241, 185, 0)':
    type === 'ice' ? newTypeColor = 'rgb(0, 255, 255)':
    type === 'normal' ? newTypeColor = 'rgb(221, 221, 221)':
    type === 'steel' ? newTypeColor = 'rgb(161, 161, 161)':
    type === 'flying' ? newTypeColor = 'rgb(108, 196, 255)':
    type === 'water' ? newTypeColor = 'rgb(58, 110, 255)':
    type === 'psychic' ? newTypeColor = 'rgb(165, 4, 165)':
    newTypeColor = 'rgb(10, 10, 10)'
    
    return newTypeColor
  } 

    return(
      
        <div className={styles.container} >
           <div className={styles.title}>
               <div className={styles.imgContainer} style={{ backgroundColor: newColor(data2.color.name)}}>
                <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data?.id}.png`} width={210} height={210} />
               </div>
                <h2>{data?.name}</h2>
                <div className={styles.types}>
                  <span style={{backgroundColor: newTypeColor(data?.types?.[0].type.name)}}>{data?.types?.[0].type.name}</span>
                  
                  {data?.types?.[1]?.type.name  
                    ?<span style={{backgroundColor: newTypeColor(data?.types?.[1].type.name)}} >{data?.types?.[1]?.type.name}</span>
                    :null
                  }
                
                </div>
                <div className={styles.stats}>
                   <p style={{textAlign: 'center', fontWeight: 'bold'}} >Stats:</p>
                   <div className={styles.lineOne}>
                    <div style={{ backgroundColor: 'rgb(255, 115, 115)'}}>
                      <p>Hp</p>
                      <p >{data.stats[0].base_stat}</p>
                    </div>
                    <div>
                      <p>Atk</p>
                     <p>{data.stats[1].base_stat}</p>
                    </div>
                    <div style={{backgroundColor: "rgb(0, 89, 255)"}}>
                      <p>Def</p>
                     <p>{data.stats[2].base_stat}</p>
                    </div>
                   </div>
                   <div className={styles.lineTwo}>
                   <div  style={{backgroundColor: "rgb(145, 203, 255)"}}>
                     <p>Spc.Atk</p>
                     <p>{data.stats[3].base_stat} </p>
                    </div>
                    <div style={{backgroundColor: "rgb(0, 124, 6)"}}>
                      <p>Spc.Def</p>
                     <p>{data.stats[4].base_stat}</p>
                    </div>
                    <div style={{backgroundColor: "rgb(211, 170, 248)"}}>
                    <p>Spd</p>
                     <p>{data.stats[5].base_stat}</p>
                    </div>
                   </div>
                    
                    
                </div>
           </div>
           
        </div>
    )
}