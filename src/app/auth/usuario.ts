
export class Usuario {
  id!: string;
  name!: string;
  username!: string;
  password!: string;
  role!: string;

  constructor(id: string, name: string, username:string, password: string, role: string) {
    this.id = id;
    this.name = name
    this.username = username
    this.password = password
    this.role = role
  
  }
}

