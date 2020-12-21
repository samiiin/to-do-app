import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class CreateCategoryDto {
    @ApiProperty({minLength: 3, default: 'music' ,maxLength:20})
    readonly name: string;
}