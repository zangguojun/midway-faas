import { Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { IMidwayContainer, IMidwayApplication } from '@midwayjs/core';
import { join } from 'path';
import * as dotenv from 'dotenv';
import * as faas from '@midwayjs/faas';
import * as validate from '@midwayjs/validate';
import * as axios from '@midwayjs/axios';

dotenv.config();

@Configuration({
  imports: [faas, validate, axios],
  importConfigs: [join(__dirname, 'config')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  async onReady(container: IMidwayContainer, mainApp?: IMidwayApplication) {}
}
