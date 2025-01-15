export interface APIResponse<T> {
    message: string;
    status: number;
    data: T | T[];
  }

export interface IAccount{
    _id: string
    firstName: string
    lastName: string
    email: string
    password: string
    avatarUrl: string
    role: string
}

export interface ICategory{
    _id: string
    name: string
    slug: string
    imageUrl: string
}

export interface DTOLogin {
    email: string
    password: string
}

export interface DTORegister {
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
}

export interface APILoginResponse{
    status: number
    message: string
    accessToken: string
    refreshToken: string
}
