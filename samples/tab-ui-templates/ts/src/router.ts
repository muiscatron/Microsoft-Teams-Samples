import { RouteRecordRaw } from 'vue-router'
import AboutView from './app/About.vue'
import PrivacyView from './app/Privacy.vue'
import TermsOfUseView from './app/TermsOfUse.vue'
import WelcomeTab from './app/static_tabs/Welcome.vue'
import DashboardTab from './app/static_tabs/Dashboard.vue'
import ListTab from './app/static_tabs/List.vue'
import BoardsTab from './app/static_tabs/TaskBoards.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/privacy', component: PrivacyView },
  { path: '/termsofuse', component: TermsOfUseView },
  { path: '/welcome', component: WelcomeTab },
  { path: '/dashboard', component: DashboardTab },
  { path: '/list', component: ListTab },
  { path: '/board', component: BoardsTab },
  { path: '/', component: AboutView }
]