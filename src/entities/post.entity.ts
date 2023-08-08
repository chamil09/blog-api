import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract.entity";

@Entity('post')
export class PostEntity extends AbstractEntity {

    @Column({ unique: true })
    title: string;

    @Column()
    content: string;
}