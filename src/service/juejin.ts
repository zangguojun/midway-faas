import { Inject, Provide } from '@midwayjs/decorator';
import { Context } from '@midwayjs/faas';
import { IJuejinService } from '../interface/juejin';
import { HttpService } from '@midwayjs/axios';
import { JUEJIN_API } from '../utils/const';

@Provide()
export class JuejinService implements IJuejinService {
  @Inject()
  ctx: Context;

  @Inject()
  httpService: HttpService;

  async checkIn() {
    const { data } = await this.httpService.post(
      JUEJIN_API.checkIn,
      {},
      { headers: { Cookie: process.env.JUEJIN_COOKIE } }
    );
    return {
      success: !!data,
      data,
    };
  }

  async draw() {
    const { data } = await this.httpService.post(
      JUEJIN_API.drawApi,
      {},
      { headers: { Cookie: process.env.JUEJIN_COOKIE } }
    );
    return {
      success: !!data,
      data,
    };
  }

  async dipLucky() {
    const { data: globalBigData } = await this.httpService.post(
      JUEJIN_API.globalBigApi,
      {
        page_no: 1,
        page_size: 5,
      },
      { headers: { Cookie: process.env.JUEJIN_COOKIE } }
    );
    if (!globalBigData) {
      return {
        success: false,
      };
    }
    const { data } = await this.httpService.post(
      JUEJIN_API.dipLuckyApi,
      {
        lottery_history_id: globalBigData?.data?.lotteries?.[0]?.history_id,
      },
      { headers: { Cookie: process.env.JUEJIN_COOKIE } }
    );

    return {
      success: !!data,
      data,
    };
  }
}
