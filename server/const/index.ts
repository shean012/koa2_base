import { Context, Request } from 'koa';

export interface IContext extends Context {
  request: Request;
}