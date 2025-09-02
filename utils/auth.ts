export interface TokenValidationResult {
  isValid: boolean;
  token?: string;
  user?: any;
}

/**
 * Get token from cookies
 */
export function getTokenFromCookies(): string | null {
  if (typeof window !== "undefined") {
    // Client-side
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("token=")
    );

    return tokenCookie ? tokenCookie.split("=")[1] : null;
  }

  return null;
}

/**
 * Remove token from cookies (logout)
 */
export function removeToken(): void {
  if (typeof window !== "undefined") {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
}
