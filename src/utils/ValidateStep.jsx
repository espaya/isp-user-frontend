const validateStep = (step, method, details, setErrors) => {
  const newErrors = {};

  // STEP 1: Payment method
  if (step === 1) {
    if (!method) newErrors.method = "Please select a payment method";
  }

  // STEP 2: Details
  if (step === 2) {
    if (method === "card") {
      if (
        !details.cardNumber ||
        details.cardNumber.replace(/\s/g, "").length < 16
      )
        newErrors.cardNumber = "Valid card number is required";

      if (!details.expiry || details.expiry.length < 5)
        newErrors.expiry = "Expiry date is required";

      if (!details.cvv || details.cvv.length < 3)
        newErrors.cvv = "CVV is required";

      if (!details.name) newErrors.name = "Name on card is required";
    }

    if (method === "mobile_money") {
      if (!details.name) newErrors.name = "Your name is required";

      if (!details.phone || details.phone.length < 9)
        newErrors.phone = "Valid mobile number is required";

      if (!details.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email))
        newErrors.email = "Valid email address is required";

      if (!details.provider)
        newErrors.provider = "Mobile money provider is required";
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export default validateStep;
