import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import axios from 'axios';
import { PokeResponse } from './interfaces/poke-responce.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const URL = 'https://pokeapi.co/api/v2/pokemon?limit=650';
    const { data } = await this.axios.get<PokeResponse>(URL);
    const pokemones = data.results.map((poke) => {
      const segmentos = poke.url.split('/');
      return {
        name: poke.name,
        nroPoke: +segmentos[segmentos.length - 2],
      };
    });
    return pokemones;
  }
}
