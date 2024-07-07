export const isAuthenticated = (): boolean => {
  const cookies = document.cookie;
  const cookieArray = cookies.split(';');
  let token = '';
  cookieArray.forEach(function (value) {
    const content = value.split('=');
    token = content[1]; // valueを取得
  });
  return !!token;
};
