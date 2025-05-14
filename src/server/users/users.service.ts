import { Injectable } from '@nestjs/common';
import { remult } from 'remult';
// import { User } from '../../shared/User.entity'

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'admin@admin.com',
      password: 'admin@123',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    // const user = remult.repo(User).findFirst({ username });
   
    return this.users.find(user => user.username === username);
  }
}