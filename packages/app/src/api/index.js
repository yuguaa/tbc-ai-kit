import request from '@/utils/http'

export function gainChatDomain(data) {
  return request({
    url: `/gpt/chat/getDomainName`,
    method: 'post',
    data,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
}

export function queryChatPageList(data) {
  return request({
    url: `/gpt/chatLog/queryChatPageList`,
    method: 'post',
    data,
  })
}

export function queryChatListLimit(data) {
  return request({
    url: `/gpt/chatLog/queryChatListLimit`,
    method: 'post',
    data,
  })
}

export function queryChatLogList(data, createSource) {
  const source = createSource()
  const cancelToken = source.token
  return request({
    url: `/gpt/chatLog/queryChatLogList`,
    method: 'post',
    data,
    cancelToken,
  })
}

export function getJSONData(jsonUrl, createSource) {
  const source = createSource()
  const cancelToken = source.token
  return request({
    url: jsonUrl,
    method: 'get',
    cancelToken,
  })
}

export function saveChat(data) {
  return request({
    url: `/gpt/chatLog/saveChat`,
    method: 'post',
    data,
  })
}
