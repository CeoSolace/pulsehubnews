// src/lib/auth.ts
import { NextRequest } from 'next/server';

export function isAuthenticated(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization');
  return authHeader === `Bearer ${process.env.ADMIN_API_KEY}`;
}

export function requireAdmin(req: NextRequest): boolean {
  return isAuthenticated(req) && process.env.ADMIN_API_KEY !== undefined;
}

// Dummy authOptions to satisfy import
export const authOptions = {};
