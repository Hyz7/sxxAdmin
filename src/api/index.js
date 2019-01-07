let env = process.env.NODE_ENV

const HOST = env === 'production'? 'http://52.83.225.97:30000' : 'http://192.168.0.103:30000'

export const GET_MENU_LIST = HOST+'/getTitle'

export const GET_NEWS_LIST=HOST+'/dynamic/showNewsListByTypeId'
/**
 * 根据id删除
 * @type {string}
 */
export const DELETE=HOST+'/dynamic/delDynamic';
/**
 * 编辑界面数据
 * @type {string}
 */
export const EDIT=HOST+'/dynamic/queryDynamic';
/**
 * 更新数据
 * @type {string}
 */
export const UPDATE=HOST+'/dynamic/updateDynamic';
/**
 * 添加数据
 * @type {string}
 */
export const UPLOAD_EDITOR = HOST+'/dynamic/addDynamic'
/**
 * 登陆
 * @type {string}
 */
export const LOGIN = HOST+'/auth/login'
/**
 * 更新下载资料
 * @type {string}
 */
export const UPDATE_DOWNLOAD_INFO = HOST+'/data/updateData'
/**
 *新增下载资料
 */
export const ADD_DOWNLOAD_INFO = HOST+'/data/insertData'
/**
 * 获取下载资料列表
 * @type {string}
 */
export const GET_DOWNLOAD_INFO = HOST+'/data/findDataList'
/**
 * 删除下载资料
 * @type {string}
 */
export const DELETE_DOWNLOAD_INFO = HOST+'/data/deleteData'