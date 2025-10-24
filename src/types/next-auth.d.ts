import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role?: string;
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      email?: string | null;
      role?: string;
      accessToken?: string;
      refreshToken?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id?: string;
    role?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}
