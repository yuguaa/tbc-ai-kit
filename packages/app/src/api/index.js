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
