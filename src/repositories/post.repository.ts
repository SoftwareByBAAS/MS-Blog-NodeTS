import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Post, PostRelations, Comment} from '../models';
import {CommentRepository} from './comment.repository';

export class PostRepository extends DefaultCrudRepository<
  Post,
  typeof Post.prototype._id,
  PostRelations
> {

  public readonly comments: HasManyRepositoryFactory<Comment, typeof Post.prototype._id>;

  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource, @repository.getter('CommentRepository') protected commentRepositoryGetter: Getter<CommentRepository>,
  ) {
    super(Post, dataSource);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', commentRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
  }
}
