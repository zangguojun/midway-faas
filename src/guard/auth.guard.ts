import { Guard, IGuard } from '@midwayjs/core';
import { Context } from '@midwayjs/faas';

@Guard()
export class AuthGuard implements IGuard<Context> {
  async canActivate(context: Context, supplierClz, methodName: string): Promise<any> {
    return false
  }
}
