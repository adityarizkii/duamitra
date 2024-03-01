export const formatToIDR = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const dateNumber = date.getTime();
  const dateOffset = date.getTimezoneOffset() * 60000;

  const dateUtc = new Date();
  dateUtc.setTime(dateNumber - dateOffset);

  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  };

  return dateUtc.toLocaleDateString("id-ID", options).replace("pukul", ":");
};
