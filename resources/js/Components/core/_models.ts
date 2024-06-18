import {ID, Response} from '../../../_metronic/helpers'
export type User = {
    id?: ID
    user_id?:string
    note?:any
  initials?: {
    label: string
    state: string
  }
}

export type UsersQueryResponse = Response<Array<User>>

