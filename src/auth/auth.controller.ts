import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import * as commands from './commands/index';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthRepository } from './repository/auth.repository';
import { AUTH_CONTROLLER, AUTH_ROUTER } from '@/data/site.constants';

@Controller(AUTH_CONTROLLER)
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly authRepository: AuthRepository,
    private readonly authService: AuthService,
  ) {}

  @Post(AUTH_ROUTER.REGISTRATION)
  async registration(@Body() createAuthDto: CreateAuthDto) {
    return await this.commandBus.execute(
      new commands.RegistrationCommand(createAuthDto),
    );
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
