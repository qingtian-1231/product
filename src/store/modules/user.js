import request from '../../utils/request.js'
import { getCookie, setCookie, delCookie } from '../../utils/cookie.js'

const state = {
    id: '',
    isLogin: false,
    isAdmin: false,
    include: [
        'roles',
        'systemtags',
        'tags',
        'userstat',
        'followers'
    ],
    token: '',
    // 缓存用户信息，当进入用户页面时先查看cachedUsers中是否有用户的信息
    cachedUsers: [],
    // 获取用户列表时调用
    userList: [],
    currentUser: {},
    /*
      一些在多个模块中共享的公用变量放在这里，例如: selectedTagHome, 由于在HeaderNav和Home中都需要使用，因此放在这里(vuex)
    */
    // 用户当前选择的频道(community)
    selectedCommunity: {
        id: 'all',
        name: '全部标签',
        feature_image: 'all'
    },
    settings: {
        // 只看中文
        onlyChinese: false,
        // 标签分类
        selectedCommunityId: 'all'
    },
    selectedTagHome: {
        value: null,
        type: ''
    },
    selectedTagUser: {
        value: null,
        type: ''
    },
    selectedCardtagHome: {
        id: null,
        name: null,
        display_name: null
    },
    selectedCardtagColumn: {
        id: null,
        name: null,
        display_name: null
    },
    selectedCardtagUser: {
        id: null,
        name: null,
        display_name: null
    },
    selectedCardtagFeatured: {
        id: null,
        name: null,
        display_name: null
    },
    uploadPercentage: 0
}

const mutations = {
    PUSH_USER_TO_CACHE (state, payload) {
        if (payload && payload.id) {
            let user = state.cachedUsers.find((item) => {
                return item.id === payload.id
            })

            if (!user) {
                state.cachedUsers.push(payload)
            }
        }
    },

    GET_USER_LIST (state, payload) {
        state.userList = payload.users
    },

    ATTACH_FOLLOWER (state, follower) {
        state.currentUser.followers.push(follower)
    },

    DETACH_FOLLOWER (state, followerId) {
        let index = state.currentUser.followers.findIndex((follower) => {
            return follower.user_id === followerId
        })

        if (index >= 0) {
            state.currentUser.followers.splice(index, 1)
        }
    },

    /**
     * [GET_CURRENT_USER description]
     * @param {[type]} state   [description]
     * @param {[type]} payload [{accessToken, user}]
     */
    GET_CURRENT_USER (state, payload) {
        if (payload.accessToken) {
            let roles = payload.user.roles

            let roleNames = roles.map(function (role) {
                return role.name
            })

            state.isAdmin = roleNames.indexOf('Administrator') > -1
            state.isLogin = true
            state.currentUser = payload.user
        }
    },

    ATTACH_SYSTEMTAG (state, systemtag) {
        state.currentUser.systemtags.push(systemtag)
    },

    DETACH_SYSTEMTAG (state, systemtagId) {
        let index = state.currentUser.systemtags.findIndex((systemtag) => {
            return systemtag.id === systemtagId
        })

        if (index >= 0) {
            state.currentUser.systemtags.splice(index, 1)
        }
    },

    SET_USERSTAT (state, userstat) {
        if (state.currentUser && state.currentUser.id) {
            state.currentUser.userstat = userstat
        }
    },
    /**
     * [SET_SELECTEDCOMMUNITY description]
     * @param {[type]} state   [description]
     * @param {[type]} payload [{community_id, defaultlanguage_only}]
     */
    SET_SETTINGS (state, payload) {
        state.settings.selectedCommunityId = payload.community_id ? payload.community_id : 'all'
        state.settings.onlyChinese = payload.defaultlanguage_only
    },

    /**
     * [SET_SELECTEDTAG description]
     * @param {[type]} state   [description]
     * @param {[type]} payload [{routeName, type, value}]
     */
    SET_SELECTEDTAG (state, payload) {
        switch (payload.routeName) {
            case 'Home':
                state.selectedTagHome.type = payload.type
                state.selectedTagHome.value = payload.value
                break
            case 'User':
                state.selectedTagUser.type = payload.type
                state.selectedTagUser.value = payload.value
                break
            default:
        }
    },

    /**
     * [SET_SELECTEDCARDTAG description]
     * @param {[type]} state   [description]
     * @param {[type]} payload [{routeName, id, name, display_name}]
     */
    SET_SELECTEDCARDTAG (state, payload) {
        switch (payload.routeName) {
            case 'Home':
                state.selectedCardtagHome.id = payload.id
                state.selectedCardtagHome.name = payload.name
                state.selectedCardtagHome.display_name = payload.display_name
                break
            case 'Column':
                state.selectedCardtagColumn.id = payload.id
                state.selectedCardtagColumn.name = payload.name
                state.selectedCardtagColumn.display_name = payload.display_name
                break
            case 'User':
                state.selectedCardtagUser.id = payload.id
                state.selectedCardtagUser.name = payload.name
                state.selectedCardtagHome.display_name = payload.display_name
                break
            case 'Featured':
                state.selectedCardtagFeatured.id = payload.id
                state.selectedCardtagFeatured.name = payload.name
                state.selectedCardtagFeatured.display_name = payload.display_name
                break
            default:
        }
    }
}

const actions = {
    // 访问用户主页时获取用户信息
    getUser ({ commit, state }, options) {
        let user = null

        // 先查看缓存的用户(cachedUsers)信息
        if (options.slug) {
            user = state.cachedUsers.find((item) => {
                return item.slug === options.slug
            })
        } else {
            user = state.cachedUsers.find((item) => {
                return item.id === options.id
            })
        }

        if (user) {
            return user
        }

        // if not find user from cached array, perform ajax call
        let apiUrl = options.slug ? `/users/slug/${options.slug}` : `/users/${options.id}`
        return request().get(apiUrl, {
            params: {
                include: state.include.join()
            }
        })
            .then(function (response) {
                commit('GET_USER', response.data)
                commit('PUSH_USER_TO_CACHE', response.data.users[0])
                return Promise.resolve(response.data.users[0])
            })
            .catch(function (error) {
                console.log(error)
                return Promise.resolve(error)
            })
    },

    getCurrentUser ({ commit, state }) {
        const sessionKey = 'ghost:session'
        const session = getCookie(sessionKey)
        const sessionValue = session ? JSON.parse(session) : ''
        const accessToken = ((sessionValue || '').authenticated || '').access_token || ''
        if (accessToken) {
            return request().get('/users/me/', {
                params: {
                    include: state.include.join()
                }
            })
                .then(function (response) {
                    commit('GET_CURRENT_USER', {
                        'user': response.data.users[0],
                        'accessToken': accessToken
                    })
                    commit('PUSH_USER_TO_CACHE', response.data.users[0])
                    if (state.currentUser && state.currentUser.userstat && state.currentUser.userstat.id) {
                        commit('SET_SETTINGS', {
                            community_id: state.currentUser.userstat.community_id,
                            defaultlanguage_only: state.currentUser.userstat.defaultlanguage_only
                        })
                    }
                    return Promise.resolve(response)
                })
                .catch(function (error) {
                    console.log(error)
                    return Promise.resolve(error)
                })
        } else {
            return Promise.resolve()
        }
    },

    // 保存用户当前设置到userstats，如果userstats记录不存在则新建, 如果userstats记录已存在则更新
    updateUserSettings ({ commit, state }) {
        if (state.isLogin) {
            // 如果userstats记录已存在则更新
            if (state.currentUser.userstat && state.currentUser.userstat.id) {
                return request().put('/userstats/' + state.currentUser.userstat.user_id,
                    {
                        userstats: [{
                            id: state.currentUser.userstat.id,
                            user_id: state.currentUser.userstat.user_id,
                            community_id: state.settings.selectedCommunityId,
                            defaultlanguage_only: state.settings.onlyChinese
                        }]
                    }
                )
                    .then(res => {
                        commit('SET_USERSTAT', res.data.userstats[0])
                        return Promise.resolve(res)
                    }, err => {
                        return Promise.resolve(err)
                    })
                    .catch(function (error) {
                        console.log(error)
                        return Promise.resolve(error)
                    })
            } else { // 如果userstats记录不存在则新建
                return request().post('/userstats',
                    {
                        userstats: [{
                            user_id: state.currentUser.id,
                            total_posts: 0,
                            total_favorites: 0,
                            community_id: state.settings.selectedCommunityId,
                            defaultlanguage_only: state.settings.onlyChinese
                        }]
                    }
                )
                    .then(res => {
                        commit('SET_USERSTAT', res.data.userstats[0])
                        return Promise.resolve(res)
                    }, err => {
                        return Promise.resolve(err)
                    })
                    .catch(function (error) {
                        console.log(error)
                        return Promise.resolve(error)
                    })
            }
        } else {
            return Promise.resolve()
        }
    },

    loginByPassword ({ commit, state }, userInfo) {
        userInfo.client_id = 'ghost-admin'
        userInfo.client_secret = 'bc40c7f6decd'

        console.log(commit, state);
        return request(true).post('/authentication/token',
            userInfo
        )
            .then(res => {
                const now = new Date()
                res.data.expires_at = res.data.expires_in * 1000 + now.getTime()
                res.data.authenticator = 'authenticator:oauth2'

                let currentUserTokenInfo = {
                    authenticated: res.data
                }

                // 存储登录用户信息
                setCookie('ghost:session', JSON.stringify(currentUserTokenInfo), res.data.expires_in * 1000, '/')

                return Promise.resolve(res)
            }, err => {
                return Promise.resolve(err)
            })
            .catch(function (error) {
                console.log(error)
                return Promise.resolve(error)
            })
    },

    logout ({ commit, state }) {
        delCookie('ghost:session', '/')

        console.log(commit);
        state.isAdmin = false
        state.isLogin = false
        state.currentUser = {}
    }
}

export default {
    state,
    mutations,
    actions
}
