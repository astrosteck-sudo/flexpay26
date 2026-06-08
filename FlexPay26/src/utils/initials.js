export function getInitials(name) {
  // Split the name into parts
  const parts = name.trim().split(" ");
  
  // Take the first character of the first two parts
  const initials = parts[0][0] + (parts[1] ? parts[1][0] : "");
  
  return initials.toUpperCase();
}
