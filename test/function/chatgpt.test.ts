import { createFunctionApp, close, createHttpRequest } from '@midwayjs/mock';
import * as ServerlessApp from '@midwayjs/serverless-app';

describe('test/ast.test.ts', () => {

  let app: ServerlessApp.Application;

  beforeAll(async () => {

    app = await createFunctionApp<ServerlessApp.Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it('should get /ast/file', async () => {
    const result = await createHttpRequest(app).get('/ast/file').query({
      url: 'https://gitee.com/buaichiyu/spider/raw/master/route.js',
      exportName: 'route'
    })
    expect(result.text).toEqual(JSON.stringify([
      {
        "path": "/"
      },
      {
        "path": "/auth/:type"
      },
      {
        "path1": "/auth/:type",
        "name": "layouts"
      },
      {
        "path": "/page"
      },
      {
        "path": "/page",
        "name": "layouts"
      },
      {
        "path": "/page/home",
        "name": "HOME"
      }
    ]));
  });

  it('should get /ast/str', async () => {
    const result = await createHttpRequest(app).post('/ast/str').send({
      code: `
      import { name as packageName } from './package.json'

      const name = '@/pages/auth'

      const route = [
        { path: '/', name: packageName },
        { path: '/auth/:type', name },
        { path1: '/auth/:type', name: 'layouts' },
        {
          path: '/page',
          // component: '@/layouts',
        },
        {
          path: '/page',
          name: 'layouts',
          // component
        },
        { path: '/page/home', name: 'HOME' },
      ]

      export default route
      `,
      exportName: 'route'
    })
    expect(result.text).toEqual(JSON.stringify([
      {
        "path": "/"
      },
      {
        "path": "/auth/:type"
      },
      {
        "path1": "/auth/:type",
        "name": "layouts"
      },
      {
        "path": "/page"
      },
      {
        "path": "/page",
        "name": "layouts"
      },
      {
        "path": "/page/home",
        "name": "HOME"
      }
    ]));
  });


});
