import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Topic } from './topic.model';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';

@Controller('topics')
export class TopicController {
  constructor(private topicService: TopicService) {}

  @Get()
  @ApiOperation({ summary: 'Return all the topics' })
  @ApiResponse({ status: 200, description: 'All the topics' })
  getTopics(): Topic[] {
    return this.topicService.getTopics();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTopic(@Body() data: CreateTopicDto): Topic {
    const newTopic = this.topicService.createTopic(data);
    return newTopic;
  }
}
