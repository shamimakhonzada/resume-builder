export {};

export type Roles = "admin" | "hr" | "user";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
