export function validateUsername(username: string) {
  if (!username || username.trim().length === 0) {
    return { error: "Username is required" };
  }

  const trimmedUsername = username.trim();

  if (trimmedUsername.length < 2) {
    return { error: "Username must be at least 2 characters long" };
  }

  if (trimmedUsername.length > 50) {
    return { error: "Username must be less than 50 characters" };
  }

  const sanitizedUsername = trimmedUsername.replace(/[<>\"'&]/g, "");
  if (sanitizedUsername !== trimmedUsername) {
    return { error: "Username contains invalid characters" };
  }

  return { success: true, username: sanitizedUsername };
}
