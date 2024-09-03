import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import candidateSlice from '../features/candidate/candidateSlice'
import voterSlice from '../features/voter/voterSlice'
import registerSlice from '../features/register/registerSlice'
export const store = configureStore({
  reducer: {
    candidate: candidateSlice,
    user: authSlice,
    voter: voterSlice,
    register: registerSlice,
  },
})