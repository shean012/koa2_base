import {
  IContext
} from '../const/index';

export const onError = async(ctx: IContext, next: any) => {
  try {
    await next();
  } catch (err) {
    // 开发环境下将错误打印
    if (process.env.NODE_ENV === 'development') console.log(err);
    ctx.status = err.status || 500;
    ctx.body = {
      code: err.code || ctx.status,
      errMsg: err.Msg || err.message
    };
  }
};
