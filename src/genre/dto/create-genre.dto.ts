import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class CreateGenreDto {
    @ApiProperty({minLength: 3, default: 'Fiction' ,maxLength:20})
    readonly type: string;
}