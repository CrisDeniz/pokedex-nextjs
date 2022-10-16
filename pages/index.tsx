import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Card from '../components/pokecard'
import styles from '../styles/Home.module.css'
import { Pokemon } from '../types/pokemon'

const Home: NextPage = () => {

  const [data, setData] = useState<Pokemon>()

  const URL = `https://pokeapi.co/api/v2/pokedex/1/`

  async function fetchData() {
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

  console.log(data);

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={styles.container}>
      {!data && 
        <p>Carregando..</p>
      }

    {data && 
        data.pokemon_entries.map((pokemon) => {
            return <Card key={pokemon.entry_number} {...pokemon}/>
        }, )
    }
    </div>
  )
}

export default Home
