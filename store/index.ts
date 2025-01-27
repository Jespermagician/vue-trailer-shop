// store/index.ts
export const state = () => ({
    myObject: {} as Record<string, any>
  })
  
  export const mutations = {
    setMyObject(state: any, payload: Record<string, any>) {
      state.myObject = payload;
    }
  }
  
  export const actions = {
    updateMyObject({ commit }: any, payload: Record<string, any>) {
      commit('setMyObject', payload);
    }
  }
  
  export const getters = {
    getMyObject(state: any) {
      return state.myObject;
    }
  }
  