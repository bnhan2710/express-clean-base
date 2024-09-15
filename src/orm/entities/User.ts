import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

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

  @Column({type: "varchar", length: 255 , nullable: true})
    resetPasswordToken?: string
    
  @Column({type: "datetime", nullable: true})
    resetPasswordExpires?: Date

}



