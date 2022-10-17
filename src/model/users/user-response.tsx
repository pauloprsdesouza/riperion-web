export interface UserResponse {
    id: number,
    crn: number,
    name: String,
    email: String,
    status: String,
    birthDate: Date,
    createdAt: Date,
    updatedAt: Date
}

export type UserListType = UserResponse[];