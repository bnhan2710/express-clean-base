import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Token } from "./Token"

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
   id!: number

  @Column({type: "varchar", length: 255, unique:true})
   username!: string
  
  @Column({type: "varchar", length: 255})
   password!: string
  
  @Column({type: "varchar", length: 255 , unique:true})
   email!: string

  @Column({type: "varchar", length: 255 , nullable: true})
    fullName?: string

  @Column({type: 'boolean', default: false})
    isVetificationEmail!: boolean;

  @OneToMany(() => Token, token => token.user)
    tokens!: Token[];
}



