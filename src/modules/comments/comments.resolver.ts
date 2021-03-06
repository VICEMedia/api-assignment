import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { Service } from "typedi";
import { CommentModel } from "../../models/comment.model";
import { CreateCommentInput, DeleteCommentInput, UpdateCommentInput } from "./comments.input";
import { Comment } from './comments.type';

@Resolver(of => Comment)
@Service()
export class CommentsResolver {

  @Query(returns => [Comment])
  async getComments() {
    return await CommentModel.findAll();
  }

  @Query(returns => Comment)
  async getComment(
    @Arg('id') id: number
  ) {
    return await CommentModel.findByPk(id);
  }

  @Mutation(returns => Comment)
  async createComment(
    @Arg('data') data: CreateCommentInput,
    @Ctx() ctx: any) {
    const newComment = await CommentModel.create(data);
    return newComment;
  }

  @Mutation(returns => Comment)
  async updateComment(
    @Arg('data') data: UpdateCommentInput,
    @Ctx() ctx: any) {
    const commentToUpdate = await CommentModel.findByPk(data.id);
    delete data.id;
    await commentToUpdate.update(data);
    return commentToUpdate;
  }

  @Mutation(returns => Boolean)
  async deleteComment(
    @Arg('data') data: DeleteCommentInput,
    @Ctx() ctx: any) {
    const commentToDelete = await CommentModel.findByPk(data.id);
    const dest = await commentToDelete.destroy();
    return true;
  }
}