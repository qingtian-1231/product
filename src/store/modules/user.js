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
  orderHistory:[],
  CurrentUserField: {},
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

  removeFavoriteProduct(state, productUuid) {
    state.favoriteProductList = state.favoriteProductList.filter(item => {
      if (item.uuid !== productUuid) {
        return item
      }
    })
  },

  addFavoriteProduct(state, productUuid) {
    state.favoriteProductList.push({'uuid': productUuid, 'value': productUuid})
  },

  removeFavoriteFormulation(state, formulationUuid) {
    state.favoriteFormulationList = state.favoriteFormulationList.filter(item => {
      if (item.uuid !== formulationUuid) {
        return item
      }
    })
  },

  addFavoriteFormulation(state, formulationUuid) {
    state.favoriteFormulationList.push({'uuid': formulationUuid, 'value': formulationUuid})
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

  processCurrentUserFields(state, payload) {
    for (let item in payload) {
      if (!state.currentUser.hasOwnProperty(item) && payload[item].length === 1) {
        state.currentUser[item] = payload[item][0].value
      }
    }
  }
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
  forgetPass({ commit, state }, mail) {
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
          commit('processCurrentUserFields', response.data)
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
