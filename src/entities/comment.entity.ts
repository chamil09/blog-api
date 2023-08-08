import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract.entity";

@Entity('comment')
export class CommentEntity extends AbstractEntity {

    @Column()
    text: string;
}