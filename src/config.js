"use strict";
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

module.exports = {
  prod: {
    pageCount: 10,
    apiServer: "https://api.basf-product.com/"
  },
  stage: {
    pageCount: 10,
    apiServer: "http://api.basf.infiniteread.com"
  },
  local: {
    pageCount: 5,
    apiServer: "http://api.product.cpq"
  },
  dev: {
    pageCount: 5,
    apiServer: "http://api.product.cpq"
  }
};
