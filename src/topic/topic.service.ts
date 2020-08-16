import { Injectable } from '@nestjs/common';
import { v4 as v4uuid } from 'uuid';
import { Topic } from './topic.model';
import { CreateTopicDto } from './dto/create-topic.dto';

@Injectable()
export class TopicService {
  topics: Topic[] = [];

  getTopics(): Topic[] {
    return this.topics;
  }

  createTopic(data: CreateTopicDto): Topic {
    const newTopic = {
      id: v4uuid(),
      name: data.name,
      contents: data.contents,
    };

    this.topics.push(newTopic);

    return newTopic;
  }
}
