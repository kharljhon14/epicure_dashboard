const { env } = process as { env: { [key: string]: string } };

export const {
  MONGO_URI,
  MAILTRAP_USER,
  MAILTRAP_PASSWORD,
  VERIFICATION_EMAIL,
  NEXT_BASE_URL,
  ACTIVATE_TOKEN_SECRET,
} = env;
