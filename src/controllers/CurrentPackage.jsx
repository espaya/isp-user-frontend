import Cookies from "js-cookie";

const CurrentPackage = async (
  setLoading,
  apiBase,
  setCurrentPackage, // ✅ change this
  setErrors,
) => {
  setErrors({});
  setLoading(true);

  try {

    const token = localStorage.getItem("token");

    const response = await fetch(`${apiBase}/api/user-current-package`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setErrors({ general: data.message });
      return;
    }

    setCurrentPackage(data); // ✅ change this
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default CurrentPackage;
