import axios from 'axios'
import { getCookie } from '../utils/cookie.js'

const clientId = 'ghost-frontend'
const clientSecret = 'cdd1a03354b5'
const sessionKey = 'ghost:session'
const apiServer = '/ghost/api/v0.1/'

function request (isAdmin) {
    const session = getCookie(sessionKey)
    const sessionValue = session ? JSON.parse(session) : ''
    const accessToken = ((sessionValue || '').authenticated || '').access_token || ''
    const authHeader = 'Bearer' + ' ' + accessToken

    if (isAdmin) {
        return axios.create({
            baseURL: apiServer,
            timeout: 10000
        })
    }
    return axios.create({
        baseURL: apiServer,
        timeout: 10000,
        headers: { 'Authorization': authHeader },
        params: {
            client_id: clientId,
            client_secret: clientSecret
        }
    })
}

export default request
