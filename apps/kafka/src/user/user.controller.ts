import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from '../schema/user.schema';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('User-Read')
  getAllUsers() {
    return this.userService.findAll();
  }

  @MessagePattern('User-Create')
  createUser(user: User) {
    return this.userService.createUser(user);
  }

  @MessagePattern('User-Delete')
  deleteUser(IDUser: string) {
    return this.userService.deleteUser(IDUser);
  }

  @MessagePattern('User-Find')
  findUser(username: string) {
    return this.userService.findOneUser(username);
  }
}
