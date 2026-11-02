export function formatDate(date: string) {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);

	if (!match) return date;

	const [, year, month, day] = match;

	return `${day}/${month}/${year}`;
}
