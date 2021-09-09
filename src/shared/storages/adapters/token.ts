import * as storage from "../storage";

type Token = string;

export async function setToken(token: Token): Promise<void> {
  return await storage.setItem("token", token);
}

export async function getToken(): Promise<Token> {
  return await storage.getItem("token");
}
