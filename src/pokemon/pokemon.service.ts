import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private defaultLimit: number;
  private defaultOffset: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.get<number>('defaultLimitPagination');
    this.defaultOffset = configService.get<number>('defaultOffsetPagination');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Pokemon[]> {
    const { limite = this.defaultLimit, offset = this.defaultOffset } =
      paginationDto;

    const pokemones: Pokemon[] = await this.pokemonModel
      .find()
      .limit(limite)
      .skip(offset)
      .sort({ nroPoke: 1 })
      .select('-__v')
      .exec();
    return pokemones;
  }

  async findOne(term: string): Promise<Pokemon> {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ nroPoke: term }).exec();
    } else if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term).exec();
    } else {
      pokemon = await this.pokemonModel
        .findOne({ name: term.toLowerCase().trim() })
        .exec();
    }

    if (pokemon) return pokemon;
    throw new NotFoundException(
      `No se encontr?? ning??n pokemon con el termino ${term}`,
    );
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim();
    }
    try {
      await pokemon.updateOne(updatePokemonDto).exec();
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel
      .deleteOne({ _id: id })
      .exec();
    if (!deletedCount) {
      throw new BadRequestException(
        `No se encontr?? nig??n pokemon con el id ${id}`,
      );
    }
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon existente el la DB ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException('Error interno, mirar los logs');
  }
}
