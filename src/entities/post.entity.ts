import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { CommentEntity } from "./comment.entity";

@Entity('post')
export class PostEntity extends AbstractEntity {

    @Column({ unique: true })
    title: string;

    @Column()
    content: string;

    @OneToMany(() => CommentEntity, (comment) => comment.post, {
        eager: true
    })
    comments: CommentEntity[];
}