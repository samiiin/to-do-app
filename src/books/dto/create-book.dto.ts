import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class CreateBookDto {
    @ApiProperty({description:'Enter Book Name', minLength: 3, default: 'The Alchemist' ,maxLength:60})
    readonly name: string;
    @ApiProperty({description:'Enter userID', default: 810196623 ,minimum: 1, type: 'number'})
    readonly userID: number;
    @ApiProperty({description:'Enter Book genreIDs', default: [] ,minimum: 1, type: 'number[]'})
    readonly genreIDs: number[];
}