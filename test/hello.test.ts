import { createFunctionApp, close, createHttpRequest } from '@midwayjs/mock';
import * as ServerlessApp from '@midwayjs/serverless-app';

describe('test/hello_aliyun.test.ts', () => {

  let app: ServerlessApp.Application;

  beforeAll(async () => {
    // create app
    app = await createFunctionApp<ServerlessApp.Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it('should get /', async () => {
    const result = await createHttpRequest(app).get('/').query({
      name: 'Midway.js'
    })
    expect(result.text).toEqual('Hello Midway.js');
  });

  it('should get /parseLog', async () => {
    const result = await createHttpRequest(app).get('/parseLog').query({
      url: 'https://gitee.com/buaichiyu/spider/raw/master/LICENSE',
      keys: ["Copyright", "SOFTWARE"]
    })
    expect(result.text).toEqual(JSON.stringify({
      "Copyright": [
        "Copyright (c) 2022 buchiyu\r"
      ],
      "SOFTWARE": [
        "THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r",
        "OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r",
        "SOFTWARE.\r"
      ]
    }));
  });

});
