import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { PostEntity } from "./post.entity";

@Entity('comment')
export class CommentEntity extends AbstractEntity {

    @Column()
    text: string;

    @ManyToOne(() => PostEntity, (post) => post.comments, {
        nullable: false
    })
    @JoinColumn()
    post: PostEntity;
}