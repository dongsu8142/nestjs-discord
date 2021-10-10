import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ name: 'discord_id' })
  discordId: string;

  @Column({ name: 'discord_tag' })
  discordTag: string;

  @Column()
  email: string;

  @Column()
  avatar: string;
}
