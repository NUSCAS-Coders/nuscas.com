export interface User {
  id: number,
  first_name: String,
  username: String,
  photo_url: String,
  auth_date: number,
  hash: String,
  role: userRoles
}

export enum userRoles {
  ADMIN = 'admin',
  MEMBER = 'member',
  VIEWER = 'viewer'
}