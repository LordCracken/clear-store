export type SignOutService = () => Promise<void>;

export class signOut {
  service: SignOutService;

  constructor(service: SignOutService) {
    this.service = service;
  }

  async signOut() {
    await this.service();
  }
}
