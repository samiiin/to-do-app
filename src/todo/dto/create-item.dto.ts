import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class CreateItemDto {
    @ApiProperty({minLength: 3, default: 'playing piano' ,maxLength:20})
    readonly text: string;

    @ApiProperty({default: 1,type:'number' })
    readonly taskID: number;

}