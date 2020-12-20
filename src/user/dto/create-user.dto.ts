import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Length , IsOptional, Min, IsNumber } from 'class-validator';

export default class CreateUserDto {
    @Length(3, 10)
    @ApiProperty({description:'Enter Your Name', minLength: 3, default: 'Ali' ,maxLength:10})
    readonly name: string;
    readonly books: number[] ;
    @ApiProperty({description:'Enter Your Password', minLength: 6, default: 'Password!' ,maxLength:40})
    readonly password: string;
}