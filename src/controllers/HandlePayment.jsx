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

    // 2️⃣ Handle Card Payment - Redirect to Paystack
    if (payment_method === "card") {
      if (!initData.authorization_url) {
        throw new Error("Paystack authorization URL missing");
      }
      window.location.href = initData.authorization_url;
      return;
    }

    // 3️⃣ Handle Mobile Money - Show instructions and poll for status
    if (payment_method === "mobile_money") {
      // Show instructions to user
      const result = await Swal.fire({
        title: "Check Your Phone",
        html: `
          <p>${initData.display_text || "A payment request has been sent to your phone."}</p>
          <p class="text-danger mt-3"><strong>Do NOT close this page</strong> until you complete the payment.</p>
          <p>Please check your phone and enter your PIN to authorize the payment.</p>
        `,
        icon: "info",
        confirmButtonText: "I have completed the payment",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: true,
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        // User clicked "I have completed the payment" - now verify
        await verifyPayment(initData.reference, true);
      } else {
        // User cancelled
        setLoading(false);
        setShowPaymentModal(false);
      }
    }

    // 4️⃣ Payment verification function with polling
    async function verifyPayment(reference, showLoading = false) {
      if (showLoading) {
        Swal.fire({
          title: "Verifying Payment",
          text: "Please wait while we confirm your payment...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      }

      // Poll for payment status (check every 3 seconds, up to 20 times = 60 seconds)
      let attempts = 0;
      const maxAttempts = 20;

      const checkStatus = async () => {
        attempts++;

        const verifyRes = await fetch(
          `${apiBase}/api/paystack/verify/${reference}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await verifyRes.json();

        if (verifyRes.ok && data.subscription) {
          // Payment successful
          Swal.close();
          setCurrentPackage(selectedPackage);
          setShowPaymentModal(false);
          setSelectedPackage(null);

          await Swal.fire({
            icon: "success",
            title: "Subscription Successful!",
            text: "Your package has been activated successfully.",
            confirmButtonText: "OK",
          });

          window.location.href = `/dashboard/payment/success/${reference}`;
          return true;
        }

        // Check if payment is still pending or abandoned
        if (data.status === "pending" || data.status === "abandoned") {
          if (attempts < maxAttempts) {
            // Still waiting, check again in 3 seconds
            setTimeout(checkStatus, 3000);
            return false;
          } else {
            // Timeout
            Swal.fire({
              icon: "error",
              title: "Payment Timeout",
              text: "Payment not completed within the expected time. Please check your transaction status or contact support.",
              confirmButtonText: "OK",
            });
            setLoading(false);
            return false;
          }
        }

        // Payment failed
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text:
            data.message || "Payment verification failed. Please try again.",
        });
        setLoading(false);
        return false;
      };

      await checkStatus();
    }
  } catch (err) {
    Swal.fire("Error", err.message, "error");
    setLoading(false);
  } finally {
    if (payment_method !== "mobile_money") {
      setLoading(false);
    }
  }
};

export default handlePaymentSuccess;
