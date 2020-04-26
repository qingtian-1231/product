<template>
  <div class="cookie notification on" v-if="cookieStatus">
    <span>
      {{ $t('global.cookieDescription') }}
      <a
        href="https://www.basf.com/en/tools/legal/data-protection.html"
        target="_blank"
        > {{ $t('global.cookiePolicy') }}
      </a>
    </span>
    <v-btn dark color="primary" class="confirm" @click="closeCookieMessageStatus()">
      {{ $t('global.confirm') }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "footer-bar",

  components: {},

  data: function() {
    return {
      cookieStatus: true
    };
  },
  
  mounted () {
    let cookieStatus = JSON.parse(localStorage.getItem('BASFCookieConfirm') || true)

    this.cookieStatus = cookieStatus
  },

  methods: {
    closeCookieMessageStatus () {
      localStorage.setItem('BASFCookieConfirm', false);
      this.cookieStatus = false
    }
  }
};
</script>
<style lang="scss" scoped>
  .notification {
    box-shadow: 0 0 10px 0 rgba(0,0,0,.3);
    line-height: 32px;
    padding: 16px;
    text-align: center;
    position: relative;
    z-index: 1;

    &.cookie {
      display: block;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: #fff;

      span {
        font-size: 1em;
        line-height: 1.333;
        display: inline-block;
      }

      .v-btn {
        background: none;
        border: 1px solid #333;
        font-size: .75em;
        font-family: Helvetica Neue LT W01_71488914,Helvetica,Arial,sans-serif;
        font-weight: 600;
        width: 100px;

        @media screen and (min-width: 480px) {
          margin: 0 0 0 16px;
        }
      }
    }

  }
</style>
