import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { PostModule } from '../post/post.module';

@Module({
  providers: [CommentResolver, CommentService],
  imports:[PostModule]
})
export class CommentModule {}
