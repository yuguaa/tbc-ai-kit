import http from './http'

/**
 * @description: oss上传文档之后，保存文档的接口
 * @param {*} data
 * @return {*}
 */
const sendMsgSteam = data => {
  return http({
    url: `/gpt/chat/sendMsgSteam`,
    method: 'post',
    data
  })
}

export { sendMsgSteam }
