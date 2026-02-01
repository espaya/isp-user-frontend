import Cookies from "js-cookie";

const handlePaymentSuccess = async (
  { payment_method, phone, name, email, card_number, expiry, cvv, provider }, // payment info from modal
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
    await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: "include" });

    // 1️⃣ Initialize payment with backend
    const initRes = await fetch(`${apiBase}/api/paystack/initialize`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        Accept: "application/json",
      },
      body: JSON.stringify({
        package_id: selectedPackage.id,
        payment_method, // send method to backend
        phone, // for mobile money payments
        name, // for both card and mobile money payments
        email, // for mobile money payment
        card_number,
        expiry,
        cvv,
        provider,
      }),
    });

    const initData = await initRes.json();

    if (!initRes.ok)
      throw new Error(initData.message || "Payment initialization failed");

    // 2️⃣ Open Paystack Checkout for card payments
    if (payment_method === "card") {
      if (payment_method === "card") {
        if (!initData.authorization_url) {
          throw new Error("Paystack authorization URL missing");
        }

        // Redirect user to Paystack
        window.location.href = initData.authorization_url;
        return;
      }
    } else {
      // For Mobile Money (MTN/Telecel) just verify the payment
      await verifyPayment(initData.reference);
    }

    // 3️⃣ Payment verification
    async function verifyPayment(reference) {
      const verifyRes = await fetch(
        `${apiBase}/api/paystack/verify/${reference}`,
        {
          credentials: "include",
        },
      );

      const data = await verifyRes.json();

      if (!verifyRes.ok)
        throw new Error(data.message || "Payment verification failed");

      Swal.fire({
        icon: "success",
        title: "Subscription Successful",
        text: "Package Subscribed Successfully",
        showCloseButton: true,
      });

      setCurrentPackage({
        ...selectedPackage,
        expires: selectedPackage.name.includes("Daily")
          ? "Today 11:59 PM"
          : selectedPackage.name.includes("Weekly")
            ? "This Week"
            : selectedPackage.name.includes("Monthly")
              ? "This Month"
              : "This month",
      });

      setShowPaymentModal(false);
      setSelectedPackage(null);
    }
  } catch (err) {
    Swal.fire("Error", err.message, "error");
  } finally {
    setLoading(false);
  }
};

export default handlePaymentSuccess;
