import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';

import { RegistrationCommand } from '../commands';
import { AuthRepository } from '../repository/auth.repository';
import { BadRequestException } from '@nestjs/common';
import { roundsOfHashing } from '@/data/defaultData';
import { randomBytes } from 'crypto';

@CommandHandler(RegistrationCommand)
export class CreateUserHandler implements ICommandHandler<RegistrationCommand> {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(command: RegistrationCommand) {
    const { registrationUser } = command;

    if (registrationUser.password !== registrationUser.confirmPassword) {
      throw new BadRequestException('Confirm password');
    }

    const hashedPassword = await bcrypt.hash(
      registrationUser.password,
      roundsOfHashing,
    );

    const token = randomBytes(32).toString('hex');

    registrationUser.password = hashedPassword;

    const userEmail = await this.authRepository.findUser(
      registrationUser.email,
    );
    console.log(userEmail);

    if (userEmail) {
      throw new BadRequestException('User already exists with this email', {
        cause: new Error(),
        description: 'Try another email',
      });
    }

    const userData = {
      username: registrationUser.username,
      email: registrationUser.email,
      password: hashedPassword,
    };

    const createdUser = await this.authRepository.registration(userData);

    return createdUser;
  }
}
