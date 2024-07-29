import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORM = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: '0.0.0.0',
    port: 6002,
    username: 'postgres',
    password: 'Tu.vieja123',
    database: 'postgres',
    entities: ['dist/**/*.entity.{ts,js}'],
    synchronize: true,
  };
};
