
export type AuthTypes = {
    isAuth: boolean,
    fetching: boolean,
    user: UserType
}

export type InitStateSlice = {
    name: string,
    initialState: AuthTypes
}

export type UserType = {
    uidUser: string,
    email: string | null,
    accessToken: string
    refreshToken: string
}