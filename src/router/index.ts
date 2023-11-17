import { createRouter, createWebHashHistory } from 'vue-router'
import Game from '../view/Game.vue'
import Editor from '../view/Editor.vue'

export const router = createRouter({

  history: createWebHashHistory(),
  routes: [

    {
      path: '/game',
      component: Game,
      name: 'game',
    },
    {
      path: '/editor',
      component: Editor,
      name: 'editor',
    },
  ],
})
