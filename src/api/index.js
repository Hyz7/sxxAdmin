let env = process.env.NODE_ENV

const HOST = env === 'production'? '' : 'http://192.168.0.102:8080'

export const GET_MENU_LIST = HOST+'/getTitle'