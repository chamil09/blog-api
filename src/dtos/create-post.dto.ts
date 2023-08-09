import { Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist";

export class CreatePostDto {

    @ApiProperty()
    @Length(5, 255)
    title: string;

    @ApiProperty()
    @Length(5, 1500)
    content: string;

}