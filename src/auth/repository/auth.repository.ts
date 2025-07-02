import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectId, Repository } from 'typeorm';
import { AuthEntity } from '../entities/auth.entity';
import { CreateAuthDto } from '../dto/create-auth.dto';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: MongoRepository<AuthEntity>,
  ) {}

  public async findUser(email: string) {
    const emailUser = await this.authRepository.findOneBy({ email });
    console.log('findUser', emailUser);
    return emailUser;
  }

  public async registration(userData) {
    const user = this.authRepository.create(userData);
    return await this.authRepository.save(user);
  }

  public async getAll() {
    return await this.authRepository.find();
  }

  public async updateEmailProfile(id: string, newEmail: string) {
    return await this.authRepository.findOneAndUpdate(
      { id: new ObjectId(id) },
      { $set: { email: newEmail } },
    );
  }
}
