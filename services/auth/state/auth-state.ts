import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Users } from '@/lib/types/users'

export interface UseForm extends Users {
  token: string
  expiresAt: string
  createdAt: string
}

export interface UseAuth extends Users {
  token: string
  setUserInfo: (user: UseForm) => void
  reset: () => void
}

const initialState: UseForm = {
  email: '',
  password: '',
  expiresAt: '',
  createdAt: '',
  token: ''
}

export const useAuth = create<UseAuth>()(
  persist(
    (set) => ({
      ...initialState,
      setUserInfo: (user: UseForm) => {
        set({
          ...user
        })
      },
      reset: () => {
        set(initialState)
      }
    }),
    {
      name: 'use-auth',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
