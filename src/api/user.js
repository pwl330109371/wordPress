import serve from '@/utils/http'

export function login (data) {
  return serve({
    url: '/api/users/login',
    method: 'POST',
    data
  })
}

export function register (data) {
  return serve({
    url: '/api/users/register',
    method: 'POST',
    data
  })
}

export function getUserInfo () {
  return serve({
    url: '/api/users/current',
    method: 'GET'
  })
}

export function getMyArticle (params) {
  return serve({
    url: '/api/article/myArticle',
    method: 'GET',
    params
  })
}
