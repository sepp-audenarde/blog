export function firstLetterToUpperCase(text: string): string {
	if (text.length) return `${text.slice(0, 1).toUpperCase()}${text.slice(1)}.`;
	return text;
}

type TitleBody = {
	title: string;
	body: string;
};

export function separateMessage(text: string): TitleBody {
	const idx = text.search(/\n/);
	if (idx !== -1) {
		const title = text.slice(0, idx);
		const body = text.slice(idx);

		if (title && body)
			return {
				title: title.trim(),
				body: body.trim(),
			};
	}

	return {
		title: text.trim(),
		body: "",
	};
}

export function reverseName(fullname: string) {
	const idx = fullname.search(/\s/);
	const name = fullname.slice(0, idx);
	const surname = fullname.slice(idx);

	return `${surname}, ${name}`;
}
