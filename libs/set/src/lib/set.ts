const usedNames = new Set<string>();

export function setName(name: string): string {
  if (usedNames.has(name)) throw new Error(`${name} is already used!`);
  usedNames.add(name);

  return name;
}
