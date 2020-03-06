import * as Koa from 'koa';
import * as DebugLogger from 'koa-logger';
import * as Static from 'koa-static';
import * as path from 'path';
import * as compress from 'koa-compress';
import bodyParser from './middlewares/bodyParser';
import { onError } from './middlewares/errorCatch';
const cors = require('@koa/cors');

const app = new Koa();

// error catch
app.use(DebugLogger());

// compress
app.use(compress({
  filter: () => true,
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}));

app.use(Static(path.join(__dirname, '../static'), {
  maxage: process.env.NODE_ENV === 'production'
    ? (1000 * 60 * 60)
    : 0
}));

// corrs
app.use(cors());
// catch error
app.use(onError);
// parser
app.use(bodyParser);

module.exports = app

app.listen(3000);
