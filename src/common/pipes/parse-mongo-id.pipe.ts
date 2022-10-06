import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { StringDecoder } from 'string_decoder';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: StringDecoder) {
    if (!isValidObjectId(value)) {
      throw new BadRequestException('El id ingresado no es un id de mongo');
    }
    return value;
  }
}
