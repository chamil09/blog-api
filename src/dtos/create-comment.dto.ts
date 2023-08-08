import { Length } from "class-validator";

export class CreateCommentDto {

    @Length(5, 255)
    text: string;

}