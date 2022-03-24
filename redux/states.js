import { createSlice} from '@reduxjs/toolkit'

const initialState= {
  isLogin: false,
  baseUrl : 'http://backend.unknownchats.com/',
}

export const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
    setUrl: (state, action) => {
      state.url = action.payload
    },
  },
})

export const {setIsLogin, setUrl, } = stateSlice.actions;

export default stateSlice.reducer;