import Cookies from "js-cookie";

const fetchPackages = async (
  setLoading,
  setErrors,
  apiBase,
  setPackages,
  setPagination,
) => {
  setLoading(true);

  try {
    await fetch(`${apiBase}/sanctum/csrf-cookie`, {
      credentials: "include",
    });

    const response = await fetch(`${apiBase}/api/my-packages?page=1`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("CSRF-TOKEN")),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setErrors({ general: data.message });
      return;
    }

    setPackages(data.data);
    setPagination({
      current_page: data.current_page,
      last_page: data.last_page,
      next_page_url: data.next_page_url,
      prev_page_url: data.prev_page_url,
    });
  } catch (err) {
    setErrors({ general: err.message });
  }
};

export default fetchPackages;
