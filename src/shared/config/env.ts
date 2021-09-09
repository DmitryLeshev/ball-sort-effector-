const getEnvVar = (key: string): any => {
  const envKey = import.meta.env[key];
  if (envKey === undefined) {
    throw new Error(`Env variable ${envKey} is required`);
  }
  return envKey;
};

export const APP: "APP_NAME" = getEnvVar("VITE_APP");
export const SOME_KEY: "SOME_KEY" = getEnvVar("VITE_SOME_KEY");

export const MODE = getEnvVar("MODE");
export const DEV = getEnvVar("DEV");
export const PROD = getEnvVar("PROD");

console.log({ env: import.meta.env });
