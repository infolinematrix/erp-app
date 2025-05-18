import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import knex, { Knex } from 'knex';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KnexService implements OnModuleInit, OnModuleDestroy {
  private knexInstance!: Knex;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.knexInstance = knex({
      client: 'mysql2',
      connection: {
        host: this.configService.get<string>('database.host'),
        user: this.configService.get<string>('database.user'),  // match config.ts
        password: this.configService.get<string>('database.password'),
        database: this.configService.get<string>('database.name'),
        port: this.configService.get<number>('database.port'),
      },
      pool: { min: 2, max: 10 },
      acquireConnectionTimeout: 10000, // 10 seconds
    });
  }

  get db(): Knex {
    return this.knexInstance;
  }

  async onModuleDestroy() {
    await this.knexInstance.destroy();
  }
}
