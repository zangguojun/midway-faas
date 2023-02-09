import { Guard, IGuard } from '@midwayjs/core';
import { Context } from '@midwayjs/faas';

@Guard()
export class AuthGuard implements IGuard<Context> {
  async canActivate(context: Context, supplierClz, methodName: string): Promise<any> {
    console.log('🚀~ 7 canActivate supplierClz', supplierClz)
    console.log('🚀~ 8 canActivate methodName', methodName)
    return false
  }
}
