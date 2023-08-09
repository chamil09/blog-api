import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class CreateCommentDto {

    @ApiProperty()
    postId: number;

    @ApiProperty()
    @Length(5, 255)
    text: string;

}