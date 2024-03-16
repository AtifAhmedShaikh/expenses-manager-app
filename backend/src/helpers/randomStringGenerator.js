const randomString =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*-_+=[]{}~`";

// generate random string, use for generate radom user
export const generateRandomString = () => {
  let str = "";
  for (let i = 1; i <= 10; i++) {
    let char = Math.floor(Math.random() * str.length + 1);
    str += randomString.charAt(char);
  }
  return str;
};
