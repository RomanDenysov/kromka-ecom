export function getNameInitials(fullName: string): string {
  const nameParts = fullName.split(' ')
  let initials = ''

  for (const part of nameParts) {
    if (part && part.length > 0) initials += part[0]?.toUpperCase()
  }

  return initials
}
