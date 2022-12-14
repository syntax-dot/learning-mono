import { RouteRecordRaw } from 'vue-router'
import CategoriesPage from '../views/CategoriesPage.vue'
import CategoryPage from '../views/CategoryPage.vue'
import StatisticPage from '../views/StatisticPage.vue'
import ThemePage from '../views/ThemePage.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', component: CategoriesPage, name: 'home' },
  { path: '/category/:categoryId', component: CategoryPage, props: true, name: 'category' },
  { path: '/themes/:themeId', component: ThemePage, props: true, name: 'theme' },
  { path: '/statistic', component: StatisticPage, name: 'statistic' },
]
