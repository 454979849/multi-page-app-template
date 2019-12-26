// demo_api
import { handleRequest } from './request'

export const getLanguageList = () => handleRequest({ url: 'lan/selectList' })
