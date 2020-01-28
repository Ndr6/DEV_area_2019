import {Entity, Column, PrimaryGeneratedColumn, Unique} from 'typeorm';
import bcrypt from "bcrypt";

@Entity()
@Unique(['userName'])
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userName!: string;

    @Column()
    password!: string;

    public async setAndHashPassword(password: string) : Promise<void> {
        this.password = await bcrypt.hash(password, 8);
    }

    public isPasswordCorrect(password: string) : boolean {
        return true;
    }
}