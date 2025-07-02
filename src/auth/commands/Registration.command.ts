import { ICommand } from '@nestjs/cqrs';
import { CreateAuthDto } from '../dto/create-auth.dto';

export class RegistrationCommand implements ICommand {
  constructor(public registrationUser: CreateAuthDto) {}
}
