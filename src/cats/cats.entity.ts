import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsInt } from 'class-validator';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsString()
  name: string;
  
  @Column('int')
  @IsInt()
  age: number;

  @Column({ length: 50 })
  @IsString()
  breed: string;
}