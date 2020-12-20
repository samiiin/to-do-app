import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class LoginDto {
    @ApiProperty({description:'Enter Your Name', minLength: 3, default: 'Ali' ,maxLength:10})
    readonly username: string;
    @ApiProperty({description:'Enter Your Password', minLength: 6, default: 'Password!' ,maxLength:40})
    readonly password: string;
}