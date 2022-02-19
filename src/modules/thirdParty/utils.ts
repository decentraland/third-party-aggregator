export const parseMetadata = (metadata: string) => {
  const [, , name, description] = metadata.split(':');
  return { name, description };
};
