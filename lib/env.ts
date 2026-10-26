/**
 * Validation des variables d'environnement au démarrage
 */

const REQUIRED_SERVER_VARS = [
  "DATABASE_URL_POSTGRES",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "BETTER_AUTH_SECRET",
  "BETTER_AUTH_URL",
] as const;

const REQUIRED_PUBLIC_VARS = ["NEXT_PUBLIC_BASE_URL"] as const;

type ServerVar = (typeof REQUIRED_SERVER_VARS)[number];
type PublicVar = (typeof REQUIRED_PUBLIC_VARS)[number];

function validateEnv() {
  if (process.env.NODE_ENV === "test") return;

  const missing: string[] = [];

  for (const key of REQUIRED_SERVER_VARS) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  for (const key of REQUIRED_PUBLIC_VARS) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `\n\n variable d'environnement maquantes :\n\n` +
        missing.map((key) => ` -${key}`).join("\n") +
        `\n\n Concultez .env.example pour la liste complete \n`,
    );
  }
}

// execute la validation immédiatement à 'import du fichier
validateEnv();

// accesseurs typés, typescript garantit que ces valuer existent
export const env = {
  DATABASE_URL_POSTGRES: process.env.DATABASE_URL_POSTGRES as string,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL as string,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET as string,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL as string,
} satisfies Record<ServerVar | PublicVar, string>;
