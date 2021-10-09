import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'discord_id' })
  discordId: string;

  @Column({ name: 'discord_tag' })
  discordTag: string;

  @Column()
  email: string;

  @Column()
  avatar: string;
}
