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
