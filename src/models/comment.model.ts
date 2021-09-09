import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Post, PostWithRelations} from './post.model';

@model({settings: {strict: false, strictObjectIDCoercion: true}})
export class Comment extends Entity {

  @property({
    type: 'string',
    required: false,
    generated: true,
    id: true,
    mongodb: {dataType: 'ObjectId'},
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  content: string;

  @property({
    type: 'number',
    enum: [1, 2],
    required: true,
  })
  status: number;

  @property({
    type: 'date',
    default: Date.now(),
    required: true,
  })
  createTime: string;

  @property({
    type: 'string',
    required: true,
  })
  author: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  url?: string;

  @belongsTo(() => Post,
    {},
    {
      mongodb: {dataType: 'ObjectId'}
    })
  postId?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Comment>) {
    super(data);
  }
}

export interface CommentRelations {
  // describe navigational properties here
  post?: PostWithRelations;
}

export type CommentWithRelations = Comment & CommentRelations;
