import { Module } from '@nestjs/common';
import { TopicModule } from './topic/topic.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthRepository } from './auth/auth.repository';
import { PrismaService } from './persistence/prisma.service';

@Module({
  imports: [TopicModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, PrismaService],
})
export class AppModule {}
