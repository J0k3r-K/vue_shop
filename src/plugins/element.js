import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
/* 将Message挂载为Vue原型上的一个属性 */
Vue.prototype.$message = Message
