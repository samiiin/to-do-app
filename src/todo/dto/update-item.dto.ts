import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class CreateItmDto {
    @ApiProperty({minLength: 3, default: 'playing piano' ,maxLength:20})
    readonly text: string;

}