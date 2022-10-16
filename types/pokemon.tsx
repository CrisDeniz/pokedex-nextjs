export type Pokemon = {
    name:string,
    pokemon_entries: [
        {
            entry_number: number
            pokemon_species: {
                entry_number: number
                name: string
            }
        }
    ]
}