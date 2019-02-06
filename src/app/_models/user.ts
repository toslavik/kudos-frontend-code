import { Role } from './role';

export class User {
    id?: string;
    username: string;
    fullname: string;
    role?: Role;
    token?: string;
}
