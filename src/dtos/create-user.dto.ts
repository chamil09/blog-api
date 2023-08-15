import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    username: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    password: string;

}