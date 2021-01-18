import {LoginService} from './login/login.service';

export function appInitializer(authService: LoginService) {
  return () =>
    new Promise((resolve) => {
      console.log('refresh token on app start up')
      authService.refreshToken().subscribe().add(resolve);
    });
}
