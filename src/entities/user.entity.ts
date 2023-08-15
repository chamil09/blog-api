import { Column, Entity, Unique } from "typeorm";
import { AbstractEntity } from "./abstract.entity";

@Entity('user')
@Unique(['username', 'email'])
export class UserEntity extends AbstractEntity {

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;
}