export class User {

  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  active: boolean;
  statusMsg : string;
  authStatus : string;


  constructor(
    id?: number,
    name?: string,
    email?: string,
    password?: string,
    role?: string,
    createdAt?: Date,
    active?: boolean,
    statusMsg?: string,
    authStatus?: string
  ) {
    this.id = id || 0;
    this.name = name || '';
    this.email = email || '';
    this.password = password || '';
    this.role = role || '';
    this.createdAt = createdAt!;
    this.active = active!;
    this.statusMsg = statusMsg || '';
    this.authStatus = authStatus || '';
  }

}
