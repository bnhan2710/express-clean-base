import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { TokenTypes } from "../../common/enums/tokens"; 

@Entity('tokens')
export class Token {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @ManyToOne(() => User, user => user.tokens , { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ type: "varchar", length: 255, unique: true })
    token!: string;

    @Column({ 
        type: "enum", 
        enum: TokenTypes, 
        nullable: true 
    })
    type!: TokenTypes;

    @Column({ type: "datetime", default: null, nullable: true })
    expires!: Date;

    @Column({ type: 'boolean', default: false })
    isBlacklisted!: boolean;
}
