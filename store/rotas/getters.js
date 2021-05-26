import { getField } from 'vuex-map-fields';
import {RotasLeftJoinUser } from './rotaUtil'

export default {
      GetRotasLeftJoinUser: (state) => {
            return RotasLeftJoinUser(state.rotasData, state.userselected, state.usersData)
      },

      getField
}