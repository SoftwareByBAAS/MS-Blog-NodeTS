import {embedsMany, Entity, model, property} from '@loopback/repository';
import {Comment, CommentWithRelations} from './comment.model';

enum Status {
  ONE = 1,
  TWO = 2,
  THREE = 3
};

@model({settings: {strictObjectIDCoercion: true}})
export class Post extends Entity {
  @property({
    type: 'string',
    required: false,
    generated: true,
    id: true,
    mongodb: {dataType: 'ObjectId'},
  })
  _id: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  content: string;

  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  tags?: string[];

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      enum: Object.values(Status),
    },
  })
  status: number;

  @property({
    type: 'date',
    default: new Date(Date.now()),
    required: true,
  })
  createTime: string;

  @property({
    type: 'date',
    default: new Date(Date.now()),
    required: true,
  })
  updateTime: string;

  @property({
    type: 'string',
    required: true,
  })
  authorId: string;

  @property({
    type: 'string',
    required: false,
    mongodb: {dataType: 'ObjectID'},
  })
  comments: [];

  constructor(data?: Partial<Post>) {
    super(data);
  }
}

export interface PostRelations {
  // describe navigational properties here
  comments?: CommentWithRelations[];
}

export type PostWithRelations = Post & PostRelations;
