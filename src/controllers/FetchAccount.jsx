
const fetchAcount = async (apiBase, setErrors, setAccount, setLoading) => {
  setLoading(true);
  try {

    const token = localStorage.getItem("token");

    const response = await fetch(`${apiBase}/api/my-account`, {
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

    setAccount(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default fetchAcount;
