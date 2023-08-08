import { Length } from "class-validator";

export class CreatePostDto {
    @Length(5, 255)
    title: string;

    @Length(5, 1500)
    content: string;

}