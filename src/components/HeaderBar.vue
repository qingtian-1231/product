<template>
  <div class="top-header">
    <v-container px-0 py-0>
      <v-toolbar color="white" height="64px" flat>
        <!--<v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up ml-0"></v-toolbar-side-icon>-->
        <v-toolbar-title class="headline ml-0">
          <router-link :to="{ name: 'Home' }">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                 viewBox="0 0 340.9 68.1" style="enable-background:new 0 0 340.9 68.1;" class="bh-header-logo" xml:space="preserve">
              <path fill="rgba(0,0,0,.87)" class="st0" d="M86.1,15.2h18.5c8.6,0,13,3.6,13,10c0,5.2-2.2,8-7,9.5c5.5,1.1,8.7,4.7,8.7,9.8c0,8.2-4.1,11.8-14.5,11.8H86.1
                V15.2z M92.7,32.5h10.2c5.2,0,7.9-2.3,7.9-6.6s-2.5-6.4-8.2-6.4h-10L92.7,32.5z M92.7,37.3v14.5h11.2c6.1,0,8.6-2.2,8.6-7.1
                c0-4.7-3.1-7.4-9.1-7.4L92.7,37.3z"/>
              <path fill="rgba(0,0,0,.87)" class="st0" d="M124.1,15.2L124.1,15.2c1.5,0,2.8,1.2,2.8,2.7c0,0,0,0,0,0v38.3h-5.5V17.9C121.4,16.4,122.6,15.2,124.1,15.2z"
              />
              <path fill="rgba(0,0,0,.87)" class="st0" d="M129,41c0-8.9,5.2-15.6,15.2-15.6c9.4,0,14.7,6.4,14.7,15.3c0,9.5-5.6,15.5-15,15.5C135.1,56.2,129,50.2,129,41
                z M152.1,40.8c0-6.8-3.2-10.7-8.1-10.7c-5.3,0-8.3,3.9-8.3,10.8s3.7,10.5,8.3,10.5C148.9,51.5,152.1,48,152.1,40.8L152.1,40.8z"/>
              <path fill="rgba(0,0,0,.87)" class="st0" d="M161.9,60.8c0-0.7,0.5-1.3,1.2-1.3c0.3,0,0.5,0.1,0.8,0.2c3.1,2,6.6,3.1,10.3,3.2c6.2,0,9.1-2.5,9.1-7.8h-6.7
                c-10.5,0-15.7-4.8-15.7-14c0.1-9.5,5.4-14.8,15.7-14.8h9.1c2.3,0,4.1,1.8,4.1,4.1l0,0V54c0,9.7-4.3,14.1-14.4,14.1
                c-5.6,0-10.3-1.5-13.4-4.3L161.9,60.8z M183.2,30.7h-5c-6.9,0-10.6,3.7-10.6,10.5c0,6.5,3.5,9.7,10.4,9.7h5.2L183.2,30.7z"/>
              <path fill="rgba(0,0,0,.87)" class="st0" d="M196,15.2L196,15.2c1.8,0,3.3,1.5,3.3,3.3c0,0,0,0,0,0v7.7h8c8.3,0,12.1,3.7,12.1,10.6V56h-6.5V37.9
                c0-5.1-2.3-7.4-7.9-7.4h-5.7V56h-6.5V18.5C192.8,16.7,194.2,15.2,196,15.2z"/>
              <path fill="rgba(0,0,0,.87)" class="st0" d="M221.5,41c0-8.9,5.2-15.6,15.2-15.6c9.4,0,14.7,6.4,14.7,15.3c0,9.5-5.6,15.5-15,15.5
                C227.6,56.2,221.5,50.1,221.5,41z M244.6,40.8c0-6.8-3.2-10.7-8.1-10.7c-5.3,0-8.3,3.9-8.3,10.8s3.7,10.5,8.3,10.5
                C241.4,51.4,244.6,48,244.6,40.8z"/>
              <path fill="rgba(0,0,0,.87)" class="st0" d="M253.3,32.2c0-3.3,2.6-5.9,5.9-5.9h27.2c7.4,0,10.8,3.1,10.8,10v20h-6.6V36.7c0-4.1-2.1-6.1-6.5-6.1h-5.6v25.6
                H272V35.9c0-3.7-1.6-5.3-5.6-5.3h-6.5v25.6h-6.5V32.2z"/>
              <path fill="rgba(0,0,0,.87)" class="st0" d="M305.9,42.7c0.6,5.7,4.4,8.4,10.4,8.4c3.2,0,6.4-1,9-3c0.6-0.5,1.5-0.4,2,0.3c0.2,0.2,0.3,0.6,0.3,0.9v2.7
                c-3.4,3-7.9,4.6-12.5,4.5c-9.9,0-16-5.9-16-15.1c0-10,5.9-15.7,14.8-15.7s13.8,4.2,14.7,13.8c0.2,1.7-1.1,3.2-2.8,3.4
                c-0.1,0-0.2,0-0.3,0L305.9,42.7z M322.4,38.4c0-5.1-3.1-8.1-8.2-8.1c-4.4,0-7.5,2.6-8.2,8.1H322.4z"/>
              <path fill="#F1725D" class="st1" d="M66,22.2c-0.2-2.7-1.6-5.2-3.8-6.7L36.9,0.9c-2.4-1.2-5.3-1.2-7.7,0L3.9,15.5C1.6,17,0.2,19.5,0,22.2v11.3l0,0
                v27.4c0,2.2,1.8,4,4,4h58c2.2,0,4-1.8,4-4V22.2z"/>
              <path fill="#FFFFFF" class="st2" d="M27.1,13.6l-15.4,8.7c-1.1,0.4-1.9,1.4-2,2.6v27.4c0,1.1,0.9,2,2,2h15.4c1.4,0.1,2.5-1,2.6-2.3V15
                C29.7,13.8,28.5,13.1,27.1,13.6z M23.6,47.8l-7.8,0.1c0,0,0.1-7.9,0-8h7.8V47.8z M23.6,34.5h-7.8c0.1-0.1,0-6.4,0-6.4l7.8-3.4
                L23.6,34.5z"/>
              <path fill="#FFFFFF" class="st2" d="M54.3,22.3L50.2,20v15h-7.9V15.5l-3.5-2c-1.4-0.5-2.6,0.2-2.6,1.5v36.9c0.1,1.4,1.2,2.4,2.6,2.3h3.5V39.8h7.9
                v14.5h4.1c1.1,0,2-0.9,2-2V24.9C56.2,23.7,55.4,22.7,54.3,22.3z"/>
            </svg>
          </router-link>
        </v-toolbar-title>
        <!-- 顶部菜单 -->
        <v-toolbar-items class="hidden-sm-and-down custom-menu-group">
          <!-- 首页 -->
          <v-menu offset-y v-bind:open-on-hover="userstatus">
            <v-btn flat large class="subheading" slot="activator" :active-class="activeMenu === 'home' ? 'header-menu-active' : ''" data-value="home"
                   :to="{name: 'Home'}"
                   @click.stop="headerMenuClick">
              {{ menuHome }}
            </v-btn>
            <template v-if="userstatus">
              <v-list>
                <v-list-tile v-for="item in menuHomeItems[menuHome]" active-class=""
                             :key="item.title"
                             :to="{ name: 'Home' }"
                             @click="menuHomeItemClick">
                  <v-list-tile-title :data-value="item.value">{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </template>
          </v-menu>
          <!-- 精选 -->
          <v-btn flat large class="subheading" slot="activator" :active-class="activeMenu === 'featured' ? 'header-menu-active' : ''" data-value="featured"
                 :to="{ name: 'Featured' }"
                 @click.stop="headerMenuClick">
            精选
          </v-btn>
          <!-- 专栏 -->
          <v-btn flat large class="subheading" slot="activator" :active-class="activeMenu === 'columnlist' ? 'header-menu-active' : ''" data-value="columnlist"
                 :to="{ name: 'ColumnList' }"
                 @click.stop="headerMenuClick">
            专栏
          </v-btn>
          <!-- 标签 -->
          <v-btn flat large class="subheading" slot="activator" :active-class="activeMenu === 'tutorial' ? 'header-menu-active' : ''" data-value="tutorial"
                 :to="{ name: 'Tutorial' }"
                 @click.stop="headerMenuClick">
            教程
          </v-btn>
          <!-- 留言 -->
          <v-btn flat large class="subheading" slot="activator" :active-class="activeMenu === 'MessageBoard' ? 'header-menu-active' : ''" data-value="MessageBoard"
                 :to="{ name: 'MessageBoard' }"
                 @click.stop="headerMenuClick">
            留言
          </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <!-- 右侧区域 -->
        <div class="mx-0" style="line-height:48px;">
          <!-- 设置 -->
          <v-menu offset-y open-on-hover :close-on-content-click="false" class="hidden-sm-and-down">
            <v-btn flat icon slot="activator">
              <v-icon class="text-grey-light">settings</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile>
                <v-list-tile-action>
                  <v-switch v-model="settings.onlyChinese" color="info" @change="changeOnlyChinese"></v-switch>
                </v-list-tile-action>
                <v-list-tile-title>只看中文</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <!-- 用户头像，写文章 -->
          <template v-if="userstatus">
            <v-menu offset-y open-on-hover>
              <v-avatar size="36px" slot="activator">
                <img :src="user.profile_image" alt="">
              </v-avatar>
              <v-list>
                <v-list-tile v-for="item in menuItemsPersonal" :key="item.title" @click="menuPersonalItemClick">
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            <v-btn round color="primary" dark depressed class="mr-0" href="/admin/#/editor">写文章</v-btn>
          </template>
          <template v-else>
            <v-btn round outline color="primary" @click="loginDialog = true" class="subheading right mr-0">登录</v-btn>
            <!-- <a class="subheading normal-link" style="padding-right:15px;">注册</a> -->
          </template>
        </div>
      </v-toolbar>
      <!-- 移动端需要使用的弹出式侧边栏 -->
      <template v-if="RoutersAllowBottomNav.includes($route.name)">
        <v-navigation-drawer
            temporary
            v-model="drawer"
            :mini-variant="mini"
            fixed
        >
        </v-navigation-drawer>
      </template>
    </v-container>
    <!-- 底部导航栏 -->
    <v-bottom-nav fixed color="white" :value="showBottomNav" :active.sync="bottomNavActiveItem" class="hidden-md-and-up">
      <v-btn flat value="home"
             :to="{ name: 'Home' }"
             :class="bottomNavActiveItem === 'home' ? 'header-menu-active' : 'text-grey-light'">
        <span class="bottom-nav-text">首页</span>
        <v-icon class="bottom-nav-icon">home</v-icon>
      </v-btn>
      <v-btn flat value="featured"
             :to="{ name: 'Featured' }"
             :class="bottomNavActiveItem === 'featured' ? 'header-menu-active' : 'text-grey-light'">
        <span class="bottom-nav-text">精选</span>
        <v-icon class="bottom-nav-icon">stars</v-icon>
      </v-btn>
      <v-btn flat value="columnlist"
             :to="{ name: 'ColumnList' }"
             :class="bottomNavActiveItem === 'columnlist' ? 'header-menu-active' : 'text-grey-light'">
        <span class="bottom-nav-text">专栏</span>
        <v-icon class="bottom-nav-icon">view_column</v-icon>
      </v-btn>
      <v-btn flat value="more"
             :class="bottomNavActiveItem === 'more' ? 'header-menu-active' : 'text-grey-light'"
             @click.stop="drawer = !drawer">
        <span class="bottom-nav-text">{{ moreText }}</span>
        <v-icon class="bottom-nav-icon">menu</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'header-bar',
    components: { },
    props: ['userstatus', 'user'],
    data () {
      return {
        loginDialog: false,
        menuHome: '首页',
        activeMenu: 'home',
        menuHomeItems: {
          '首页': [
            {
              title: '我的文章',
              value: 'my'
            },
            {
              title: '我的收藏',
              value: 'favorite'
            }
          ],
          '全部': [
            {
              title: '我的文章',
              value: 'my'
            },
            {
              title: '我的收藏',
              value: 'favorite'
            }
          ],
          '我的文章': [
            {
              title: '全部',
              value: 'home'
            },
            {
              title: '我的收藏',
              value: 'favorite'
            }
          ],
          '我的收藏': [
            {
              title: '全部',
              value: 'home'
            },
            {
              title: '我的文章',
              value: 'my'
            }
          ]
        },
        menuItemsPersonal: [
          {
            title: '我的主页',
            link: '/user/' + this.user.slug,
            obj: {
              name: 'User',
              params: {
                userId: this.user.slug
              }
            }
          },
          {
            title: '我的标签',
            link: '/managetags',
            obj: {
              name: 'ManageTags'
            }
          },
          {
            title: '写专栏',
            link: '/columneditor/new',
            obj: {
              name: 'ColumnEditor',
              params: {
                id: 'new'
              }
            }
          },
          {
            title: '管理文章',
            link: '/admin/#/'
          },
          {
            title: '设置',
            link: '/admin/#/team/' + this.user.slug
          },
          {
            title: '退出',
            link: '/admin/#/signout'
          }
        ],
        drawer: null,
        mini: false,
        bottomNavActiveItem: '',
        RoutersAllowBottomNav: ['Home', 'User', 'Column', 'ColumnList', 'Featured']
      }
    },
    methods: {
      closeDialog: function () {
        this.loginDialog = false
      },

      headerMenuClick: function (event) {
        let btn = $(event.target)
        let value = btn.closest('a.subheading').data('value')

        // console.log(btn.closest('a.subheading').data('value'))
        // console.log(btn[0].tagName)

        this.activeMenu = value
        this.setBottomNavValue(value)
      },
      menuHomeItemClick: function (event) {
        // console.log('call headerHomeClick')
        // console.log(event.target)
        let menuItem = $(event.target)

        this.activeMenu = 'home'
        this.setBottomNavValue('home')
        this.setMenuNavActions(menuItem.data('value'))
        this.$store.state.posts.postListType = menuItem.data('value')
      },
      menuPersonalItemClick: function (event) {
        var currentItem = $(event.target)
        let menuItem = this.menuItemsPersonal.find((item) => {
          return item.title === currentItem.text()
        })

        if (menuItem) {
          if (menuItem.obj) {
            this.$router.push(menuItem.obj)
          } else {
            window.location.href = menuItem.link
          }
        }
      },
      setBottomNavValue: function (val) {
        // console.log('call setBottomNavValue:' + val)
        this.bottomNavActiveItem = val
      },
      setMenuNavActions: function (val) {
        // console.log('call setMenuNavActions:' + val)
        switch (val) {
          case 'my':
            this.menuHome = '我的文章'
            break
          case 'favorite':
            this.menuHome = '我的收藏'
            break
          default:
            if (this.userstatus) {
              this.menuHome = '全部'
            } else {
              this.menuHome = '首页'
            }
        }
      },
      changeOnlyChinese: function () {
        this.$store.dispatch('updateUserSettings')
      }
    },

    mounted: function () {
      // console.log('call mounted:' + this.$route.name)
      switch (this.$route.name) {
        case 'Home':
          this.activeMenu = 'home'
          this.setBottomNavValue('home')
          break
        case 'Featured':
          this.activeMenu = 'featured'
          this.setBottomNavValue('featured')
          break
        case 'ColumnList':
          this.activeMenu = 'columnlist'
          this.setBottomNavValue('columnlist')
          break
        case 'Tutorial':
          this.activeMenu = 'tutorial'
          break
        case 'MessageBoard':
          this.activeMenu = 'MessageBoard'
          break
        case 'Column':
          this.activeMenu = ''
          this.setBottomNavValue('')
          break
        case 'User':
          this.activeMenu = ''
          this.setBottomNavValue('')
          break
        case 'Post':
          this.activeMenu = ''
          this.setBottomNavValue('')
          break
        default:
          this.activeMenu = ''
          this.setBottomNavValue('')
      }
    }
  }
</script>

<style scoped>
  .top-header {
    background-color: white;
  }

  .top-header::after {
    box-shadow: 0 1px 0px 0 #EEEEEE;
    display: block;
    position: absolute;
    color: #EEEEEE;
    content: "";
    width: 100%;
    height: 1px;
    margin-top: -1px;
  }
  .custom-menu-group {
    flex: 5;
    margin-left: 30px !important;
  }

  .header-menu-active {
    color: #f1725d !important;
  }

  .bottom-nav-icon {
    margin-bottom: 4px;
  }

  .bottom-nav-text {
    font-size: 14px;
  }

  .bottom-nav .btn {
    min-width: 65px !important;
  }
  button.subheading {
    line-height: 1;
  }
</style>
