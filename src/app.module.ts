import { Module } from '@nestjs/common';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [TopicModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
