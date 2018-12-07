let env = process.env.NODE_ENV

const HOST = env === 'production'? '' : 'http://192.168.0.104:30000'

export const GET_MENU_LIST = HOST+'/getTitle'
// http://localhost:30000/dynamic/showNewsInfoList?typeId=1&page=1&size=10
export const GETNEWSLIST=HOST+'/dynamic/showNewsInfoList'
/**
 * 根据id删除
 * @type {string}
 */
export const DELETE=HOST+'/dynamic/delDynamic';