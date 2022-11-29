interface CharacterLocation {
  name: string;
  url: string;
}
export interface Character {
  id: string;
  image: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  location: Pick<CharacterLocation, 'name'>;
  episode: { name: string }[];
}

export interface GetCharactersResponse {
  characters: {
    info: {
      next: number;
    };
    results: Character[];
  };
}
