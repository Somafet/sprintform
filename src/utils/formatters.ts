export const dateFormatter = (dateString: string, locale = "hu") => {
	const date = Date.parse(dateString);
	const formatter = new Intl.DateTimeFormat(locale, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	});

	return formatter.format(date);
};

const currencyLocaleMap: Record<string, string> = {
	HUF: "hu"
};

export const currencyFormatter = (value: number, currency = "HUF") => {
	const locale = currencyLocaleMap[currency] ?? "hu";

	const formatter = new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
		maximumFractionDigits: 0
	});

	return formatter.format(value);
};
