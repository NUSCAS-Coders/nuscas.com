import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import User from './types/user'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    user: User,
    token: String
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}