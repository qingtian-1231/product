import { request } from "../../utils/request.js";
import { globalUtils } from '../../utils/globalUtils'
import { getCookie, setCookie, delCookie } from "../../utils/cookie.js";

const state = {
  _format: 'hal_json',
  id: "",
  isLogin: false,
  isAdmin: false,
  token: "",
  // 缓存用户信息，当进入用户页面时先查看cachedUsers中是否有用户的信息
  cachedUsers: [],
  currentUser: {},
  favoriteProductList: [],
  favoriteFormulationList: [],
  orderHistory:[]
};

const mutations = {
  processUserFields(state, payload) {
    state.favoriteProductList = payload.result.field_product_list.map(item => {
      item.uuid = item.value
      let parentProductType = globalUtils.findParentTid(payload.productType, item.type)

      if (parentProductType) {
        item.parentTid = parentProductType.tid
      }
      else {
        item.parentTid = item.type
      }

      return item
    })
    state.favoriteFormulationList = payload.result.field_formulation_list.map(item => {
      item.uuid = item.value

      return item
    })
  },

  GET_USER_LIST(state, payload) {
    state.userList = payload.users;
  },

  ATTACH_FOLLOWER(state, follower) {
    state.currentUser.followers.push(follower);
  },

  DETACH_FOLLOWER(state, followerId) {
    let index = state.currentUser.followers.findIndex(follower => {
      return follower.user_id === followerId;
    });

    if (index >= 0) {
      state.currentUser.followers.splice(index, 1);
    }
  },

  removeFavoriteProduct(state, productUuid) {
    state.favoriteProductList = state.favoriteProductList.filter(item => {
      if (item.uuid !== productUuid) {
        return item
      }
    })
  },

  removeFavoriteFormulation(state, formulationUuid) {
    state.favoriteFormulationList = state.favoriteFormulationList.filter(item => {
      if (item.uuid !== formulationUuid) {
        return item
      }
    })
  },

  processUserOrderHistory(state, payload) {
    state.orderHistory = payload

    console.log(state.orderHistory, 'state.orderHistory')
  },

  /**
   * [GET_CURRENT_USER description]
   * @param {[type]} state   [description]
   * @param {[type]} payload [{accessToken, user}]
   */
  GET_CURRENT_USER(state, payload) {
    state.isLogin = true;
    state.currentUser = payload.user;
  },

  SET_USERSTAT(state, userstat) {
    if (state.currentUser && state.currentUser.id) {
      state.currentUser.userstat = userstat;
    }
  },
};

const actions = {
  // 访问用户主页时获取用户信息
  getUser({ commit, state }, options) {
    let user = null;

    // 先查看缓存的用户(cachedUsers)信息
    if (options.slug) {
      user = state.cachedUsers.find(item => {
        return item.slug === options.slug;
      });
    } else {
      user = state.cachedUsers.find(item => {
        return item.id === options.id;
      });
    }

    if (user) {
      return user;
    }

    // if not find user from cached array, perform ajax call
    let apiUrl = options.slug
      ? `/users/slug/${options.slug}`
      : `/users/${options.id}`;
    return request()
      .get(apiUrl, {
        params: {
          include: state.include.join()
        }
      })
      .then(function(response) {
        commit("GET_USER", response.data);
        commit("PUSH_USER_TO_CACHE", response.data.users[0]);
        return Promise.resolve(response.data.users[0]);
      })
      .catch(function(error) {
        console.log(error);
        return Promise.resolve(error);
      });
  },

  getCurrentUser({dispatch, commit, state, rootState }) {
    const sessionKey = "drupal:session";
    const session = getCookie(sessionKey);
    const sessionValue = session ? JSON.parse(session) : "";
    const current_user =
      ((sessionValue || "").authenticated || "").current_user || "";

    if (current_user) {
      commit('GET_CURRENT_USER', {
        user: current_user
      });

      dispatch('getCurrentUserFields').then((result) => {
        if (result.status === 200) {
          let payload = {}

          payload.productType = rootState.core.taxonomyProductType
          payload.result = result.data
          commit('processUserFields', payload)
        }
      })

      return Promise.resolve(current_user);
    } else {
      return Promise.resolve();
    }

    // if (current_user) {
    //   return request()
    //     .get("/user/" + current_user.uid + "?_format=json")
    //     .then(function(response) {
    //
    //       commit("GET_CURRENT_USER", {
    //         user: response.data
    //       });
    //
    //       return Promise.resolve(response);
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //       return Promise.resolve(error);
    //     });
    // } else {
    //   return Promise.resolve();
    // }
  },

  // 保存用户当前设置到userstats，如果userstats记录不存在则新建, 如果userstats记录已存在则更新
  updateUserSettings({ commit, state }) {
    if (state.isLogin) {
      // 如果userstats记录已存在则更新
      if (state.currentUser.userstat && state.currentUser.userstat.id) {
        return request()
          .put("/userstats/" + state.currentUser.userstat.user_id, {
            userstats: [
              {
                id: state.currentUser.userstat.id,
                user_id: state.currentUser.userstat.user_id,
                community_id: state.settings.selectedCommunityId,
                defaultlanguage_only: state.settings.onlyChinese
              }
            ]
          })
          .then(
            res => {
              commit("SET_USERSTAT", res.data.userstats[0]);
              return Promise.resolve(res);
            },
            err => {
              return Promise.resolve(err);
            }
          )
          .catch(function(error) {
            console.log(error);
            return Promise.resolve(error);
          });
      } else {
        // 如果userstats记录不存在则新建
        return request()
          .post("/userstats", {
            userstats: [
              {
                user_id: state.currentUser.id,
                total_posts: 0,
                total_favorites: 0,
                community_id: state.settings.selectedCommunityId,
                defaultlanguage_only: state.settings.onlyChinese
              }
            ]
          })
          .then(
            res => {
              commit("SET_USERSTAT", res.data.userstats[0]);
              return Promise.resolve(res);
            },
            err => {
              return Promise.resolve(err);
            }
          )
          .catch(function(error) {
            console.log(error);
            return Promise.resolve(error);
          });
      }
    } else {
      return Promise.resolve();
    }
  },

  getCurrentUserFields ({ commit, state }) {
    const sessionKey = "drupal:session";
    const session = getCookie(sessionKey);
    const sessionValue = session ? JSON.parse(session) : "";
    const current_user =
      ((sessionValue || "").authenticated || "").current_user || "";

    if (current_user) {
      return request()
        .get('user/' + current_user.uid, {
          params: {
            _format: state._format
          }
        })
        .then((response) => {
          return Promise.resolve(response)
        })
        .catch(error => {
          console.log(error)
          return Promise.resolve(error)
        })
    }
  },

  loginByPassword({ dispatch, commit, state }, userInfo) {
    return request()
      .post('/user/login?_format=json', userInfo)
      .then(
        res => {
          const expireTime = 7 * 24 * 3600 * 1000;
          const now = new Date();
          res.data.expires_at = expireTime + now.getTime();
          res.data.basic_auth = globalUtils.formatBasicAuth(userInfo.name, userInfo.pass)

          let currentUserTokenInfo = {
            authenticated: res.data
          };

          // 存储登录用户信息
          setCookie(
            'drupal:session',
            JSON.stringify(currentUserTokenInfo),
            expireTime,
            "/"
          );

          state.isLogin = true;
          state.currentUser = res.data.current_user

          dispatch('getCurrentUserFields').then((result) => {
            if (result.status === 200) {
              commit('processUserFields', result.data)
            }
          })

          return Promise.resolve(res);
        },
        err => {
          console.log(err);
          return Promise.resolve(err);
        }
      )
      .catch(function(error) {
        console.log(error);
        return Promise.resolve(error);
      });
  },

  logout({ commit, state }) {
    delCookie('drupal:session', '/');
    state.isAdmin = false;
    state.isLogin = false;
    state.currentUser = {};
  },

  getUserOrderHistory({ commit, state }, userId) {
    let requestPath = `api/user/${userId}/orders`
    let currentLanguage = getCookie('drupal:session:language')

    if (currentLanguage === 'en') {
      requestPath = `en/api/user/${userId}/orders`
    }
    return request().get(requestPath)
      .then(function (response) {
        commit('processUserOrderHistory', response.data)
        return Promise.resolve(response.data)
      })
      .catch(function (error) {
        console.log(error)
        return Promise.resolve(error)
      })
  }
};

export default {
  state,
  mutations,
  actions
};
