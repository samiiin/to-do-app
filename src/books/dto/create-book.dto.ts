import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class CreateBookDto {
    @ApiProperty({description:'Enter Your Book Name', minLength: 3, default: 'The Alchemist' ,maxLength:60})
    readonly name: string;
    @ApiProperty({description:'Enter Your ID', default: 810196623 ,minimum: 1, type: 'number'})
    readonly userID: number;
    @ApiProperty({description:'Enter Your genreIDs', default: [1] ,minimum: 1, type: 'number[]'})
    readonly genreIDs: number[];
}