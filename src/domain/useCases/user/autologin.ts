import { User } from '../../entities';

export interface AutologinService {
  autologin: () => Promise<User>;
}

export class AutologinCase {
  private autologinService: AutologinService;

  constructor(service: AutologinService) {
    this.autologinService = service;
  }

  async autologin() {
    return this.autologinService.autologin();
  }
}
