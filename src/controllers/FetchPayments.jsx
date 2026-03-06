
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

    const token = localStorage.getItem("token")

    const response = await fetch(
      `${apiBase}/api/get-user-payments?page=${page}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
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
