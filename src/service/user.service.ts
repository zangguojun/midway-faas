import { Inject, Provide } from '@midwayjs/decorator';
import { Context } from '@midwayjs/faas';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from "../entity/user.entity";
import { IUserService } from "../interface/user";

@Provide()
export class UserService implements IUserService{
  @Inject()
  ctx: Context;

  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;

  async create(params: any) {
    const user = new UserEntity()
    user.name = params.name
    user.tag = params.tag
    return this.userModel.save(user)
  }

  async query(params) {
    return this.userModel
      .createQueryBuilder("user")
      .where("user.createdAt < :createdAt", { createdAt: new Date(2023, 1, 2, 16, 46,40, 952 ) })
      // .where("user.tag IN (:...tag)", { tag: [ "bu1", "chi1", "yi1" ] })
      .getMany();
  }

}
