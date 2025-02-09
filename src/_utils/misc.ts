export const convertDate = (date: string) => {
	// 2025-01-31T10:58:41.525Z	=>	2025-01-31 10:58:41
	const dateObj = new Date(date);
	const day = dateObj.getDate();
	const month = dateObj.getMonth() + 1;
	const year = dateObj.getFullYear();
	const hours = dateObj.getHours();
	const minutes = dateObj.getMinutes();
	const seconds = dateObj.getSeconds();

	return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};
