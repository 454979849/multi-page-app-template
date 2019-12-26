import { apiCommonUrl, xDomain } from '../env'
import { getStore } from '../index'

/**
 * @param url 请求路径
 * @param types 请求类型
 * @param params 参数
 * @returns {Promise<unknown>}
 */
export const handleRequest = ({ url, types, params }) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: types,
      url: `${apiCommonUrl}${url}`,
      data: params || {},
      headers: {
        token: getStore('token'),
        'x-domain': xDomain
      },
      dataType: 'json',
      success: function (res) {
        const {
          meta: {
            // code = 500,
            success = false
          },
          data = {}
        } = res
        if (!res || !success) {
          reject(res)
        } else {
          resolve(data)
        }
      }
    })
  })
}
