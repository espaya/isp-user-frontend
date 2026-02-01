const getProvider = (phone, provider) => {
  if (provider) return provider.charAt(0).toUpperCase() + provider.slice(1);
  if (!phone) return "N/A";

  const prefixes = {
    "024": "MTN",
    "054": "MTN",
    "055": "Vodafone",
    "059": "Vodafone",
    "020": "AirtelTigo",
    "027": "AirtelTigo",
  };

  const prefix = phone.slice(0, 3);
  return prefixes[prefix] || "Unknown";
};

export default getProvider;
