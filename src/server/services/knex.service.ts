import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import knex, { Knex } from 'knex';

@Injectable()
export class KnexService implements OnModuleInit, OnModuleDestroy {
  private knexInstance!: Knex;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.knexInstance = knex({
      client: 'mysql2',
      connection: {
        host: process.env['MYSQL_HOST'] ?? 'localhost',
        user: process.env['MYSQL_USER'] ?? 'root',
        password: process.env['MYSQL_PASSWORD'] ?? 'password',
        database: process.env['MYSQL_DATABASE'] ?? 'nest_app',
        port: parseInt(process.env['MYSQL_PORT'] ?? '3306', 10),
      },
    });

    try {
      await this.knexInstance.raw('SELECT 1');
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection failed', error);
    }
  }

  get db(): Knex {
    return this.knexInstance;
  }

  async onModuleDestroy() {
    await this.knexInstance.destroy();
  }
  
}
