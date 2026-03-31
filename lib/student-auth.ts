import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SESSION_SECRET || 'vanaja-fallback-secret';

export interface StudentPayload {
  id: string;
  username: string;
  name: string;
  standard: string;
}

export function signStudentToken(payload: StudentPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyStudentToken(token: string): StudentPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as StudentPayload;
  } catch {
    return null;
  }
}
