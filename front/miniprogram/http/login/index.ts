
// 登录页的api
import { httpRequest } from '../request'

export default class loginApi {
  /**
   * @description: 登录接口
   * @return {*}
   */
  static getUserInfo = () => httpRequest.get<any>('/user/login')

  /**
   * @description: 登录接口
   * @params 
   *  body里写字符串"1222333 123344" 空格隔开
   * @return {*}
   */
  static login = (data:string, config?:Object) => httpRequest.post<any>('/user/login', data, config)
}
