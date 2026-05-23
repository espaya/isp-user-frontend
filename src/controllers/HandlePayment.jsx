const handlePaymentSuccess = async (
  { payment_method, phone, name, email, card_number, expiry, cvv, provider },
  {
    setLoading,
    setErrors,
    setCurrentPackage,
    setShowPaymentModal,
    setSelectedPackage,
    Swal,
  },
  { user, selectedPackage, apiBase },
) => {
  setLoading(true);
  setErrors({});

  try {
    const token = localStorage.getItem("token");

    // 1️⃣ Initialize payment with backend
    const initRes = await fetch(`${apiBase}/api/paystack/initialize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        package_id: selectedPackage.id,
        payment_method,
        phone,
        name,
        email,
        card_number,
        expiry,
        cvv,
        provider,
      }),
    });

    const initData = await initRes.json();

    if (!initRes.ok) {
      throw new Error(initData.message || "Payment initialization failed");
    }

    if (!initData.authorization_url) {
      throw new Error("Paystack authorization URL missing");
    }

    // 2️⃣ For BOTH card and mobile money, redirect to Paystack
    // Paystack will handle the payment method selection
    window.location.href = initData.authorization_url;
    return;

  } catch (err) {
    Swal.fire("Error", err.message, "error");
    setLoading(false);
  } finally {
    setLoading(false);
  }
};

export default handlePaymentSuccess;