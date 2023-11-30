export const generateAvatarPlaceholderLink = ({ name }: { name: string }) => {
  const names = name.split(' ');
  const res = `https://ui-avatars.com/api/?name=${names[0]}+${names[1]}&background=A3A3A3&color=fff`;
  return res;
};

export function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
}

export function truncateString(inputString: string, maxLength: number): string {
  if (inputString?.length <= maxLength) {
    return inputString;
  } else {
    return inputString.slice(0, maxLength) + '...';
  }
}
