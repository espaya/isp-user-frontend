import Cookies from "js-cookie";

const fetchAcount = async (apiBase, setErrors, setAccount, setLoading) => {
  setLoading(true);
  try {
    await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: "include" });

    const response = await fetch(`${apiBase}/api/my-account`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setErrors({ general: data.message });
      return;
    }

    setAccount(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default fetchAcount;
