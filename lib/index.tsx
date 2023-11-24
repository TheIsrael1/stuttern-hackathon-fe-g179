export const generateAvatarPlaceholderLink = ({ name }: { name: string }) => {
  const names = name.split(' ');
  const res = `https://ui-avatars.com/api/?name=${names[0]}+${names[1]}&background=A3A3A3&color=fff`;
  return res;
};
