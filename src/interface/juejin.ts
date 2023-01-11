import { IResult } from './common';

interface IJuejinResult<T> {
  err_no: number;
  err_msg: string;
  data: T;
}

interface ICheckInData {
  incr_point: string;
  sum_point: string;
}

interface IDipLuckyData {
  dip_action: number;
  dip_value: number;
  total_value: number;
}

interface IDrawData {
  lottery_name: string;
  draw_lucky_value: number;
  total_lucky_value: number;
}

export interface IJuejinService {
  checkIn(): Promise<IResult<IJuejinResult<ICheckInData>>>;
  dipLucky(): Promise<IResult<IJuejinResult<IDipLuckyData>>>;
  draw(): Promise<IResult<IJuejinResult<IDrawData>>>;
}
