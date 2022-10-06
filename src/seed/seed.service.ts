import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-responce.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({}).exec();
    const URL = 'https://pokeapi.co/api/v2/pokemon?limit=650';
    const { data } = await this.axios.get<PokeResponse>(URL);
    const pokemones = data.results.map((poke) => {
      const segmentos = poke.url.split('/');
      return {
        name: poke.name,
        nroPoke: +segmentos[segmentos.length - 2],
      };
    });
    await this.pokemonModel.insertMany(pokemones);
    return pokemones;
  }
}
