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
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiBase}/api/my-packages?page=1`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
  } finally {
    setLoading(false);
  }
};

export default fetchPackages;
