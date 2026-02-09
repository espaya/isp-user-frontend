import Cookies from "js-cookie";

const FetchPayments = async (
  setLoading,
  setErrors,
  setPayments,
  apiBase,
  page
) => {
  setLoading(true);
  setErrors({});

  try {
    const response = await fetch(
      `${apiBase}/api/get-user-payments?page=${page}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      setErrors({ general: data.message });
      return;
    }

    setPayments(data.data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};
export default FetchPayments;
