import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class CreateTagDto {
    @ApiProperty({minLength: 3, default: 'piano' ,maxLength:20})
    readonly name: string;
}