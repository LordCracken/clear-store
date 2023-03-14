export interface SignOutService {
  signOut: () => Promise<void>;
}

export class SignOutCase {
  private signOutService: SignOutService;

  constructor(service: SignOutService) {
    this.signOutService = service;
  }

  async signOut() {
    await this.signOutService.signOut();
  }
}
