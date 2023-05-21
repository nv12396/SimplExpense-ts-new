import { UserDetails } from 'src/user/user-details.interface';

export class AuthUserDTO {
  email: string;
  token: string;
}

export class AuthUserWithTokenDTO {
  registredUser: UserDetails;
  token: string;
}
