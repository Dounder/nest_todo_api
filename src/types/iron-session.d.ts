import 'iron-session';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: string;
      username: string;
      email: string;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
    };
  }
}
