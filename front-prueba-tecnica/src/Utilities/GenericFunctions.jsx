import Cookies from "js-cookie";
export const logout = () => {
  try {
    Cookies.remove("accessToken");
  } catch (error) {
    console.log("🚀 ~ logout ~ error:", error);
  }
};
