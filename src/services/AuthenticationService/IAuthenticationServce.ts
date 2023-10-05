import { Credentials } from '../../types/authentication';

type IAuthenticationService = {
  getToken: (credentials: Credentials) => Promise<string>;
};

export default IAuthenticationService;
