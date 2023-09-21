// 用户个人信息的api
import { get, post } from '../request'

export default class userApi {
  /**
   * @description: 获取用户信息
   * @return {*}
   */
  static getUserInfo = () => get<any>('/userlist')

  /**
   * @description: post方法示例
   * @return {*}
   */
  static getVillageList = () => post<any>('/userlist', { page: 1, limit: 10 })
}
