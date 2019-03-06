// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import {
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  Button,
  Table,
  DatePicker,
  Form,
  Select,
  Option,
  FormItem,
  TableColumn,
  Container,
  Header,
  Aside,
  Pagination,
  Main,
} from 'element-ui';
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(Menu).use(Submenu).use(MenuItem).use(MenuItemGroup).use(Input).use(Table).use(TableColumn)
  .use(Container).use(Header).use(Aside).use(Main).use(Button).use(Form).use(FormItem).use(Option)
  .use(DatePicker).use(Select).use(Col).use(Pagination)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
