import { Users } from '@/lib/types/users'
import { UseForm } from './state/auth-state'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'
import axios from 'axios'

export const signIn = async ({ email, password }: Users) => {
  try {
    const response = await axios.post<AxiosResponse<UseForm>>(
      '/api/external/api/1.0/login',
      {
        email,
        password
      }
    )

    return response.data.data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      toast.error('ERROR!', {
        description: e.response?.data.error
      })
      throw e.response?.data.error
    }
  }
}
