import { ApiProperty} from '@nestjs/swagger';

export default class UpdateTaskDto {

    @ApiProperty({minLength: 3, default: 'practice music' ,maxLength:20})
    readonly title: string;

    @ApiProperty({minLength: 3, default: 'music' ,maxLength:20})
    readonly category: string;

    @ApiProperty({description:'Enter tagIDs', default: [] ,type: 'number[]'})
    readonly tagIDs: number[];


}