import api from '@/http.js'
export function getImage() {
  return api({
    method: 'get',
    // url: '/captchaImage',
    url: '/CaptchaController/captchaImage'
  })
}
export function login(data) {
  // return api.post("/login", data)
  return api.post("/loginController/login", data)
}
export function getInfo() {
  return api.get('/getInfo')
}