import { ISession } from 'connect-typeorm/out';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sessions' })
export class Session implements ISession {
  @Index()
  @Column('bigint', { default: Date.now() })
  expiredAt: number;

  @PrimaryColumn('varchar', { length: 255 })
  id: string;

  @Column('text')
  json: string;
}
