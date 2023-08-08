import { Length } from "class-validator";

export class CreateCommentDto {

    postId: number;

    @Length(5, 255)
    text: string;

}