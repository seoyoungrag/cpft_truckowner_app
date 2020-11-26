// date에 new Date 형식의 값을 넣으면 yyyy-MM-dd 형태로 반환해줌
export const getDateStr = (date) => {
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	month = month >= 10 ? month : "0" + month;
	day = day >= 10 ? day : "0" + day;
	return year + "-" + month + "-" + day;
};

// date에 new Date 형식의 값을 넣으면 HH:mm 형태로 반환해줌
export const getTime = (date) => {
	let hours = date.getHours();
	let minutes = date.getMinutes();
	hours = hours >= 10 ? hours : "0" + hours;
	minutes = minutes >= 10 ? minutes : "0" + minutes;
	return hours + ":" + minutes;
};
// date에 new Date 형식의 값을 넣으면 yyyy-MM 형태로 반환해줌
export const getMonthStr = (date) => {
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	month = month >= 10 ? month : "0" + month;
	return year + "-" + month;
};
// data에 new Date 형식의 값을 넣으면 yy.mm.dd 형태로 반환해줌
export const getDateMark = (date) => {
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	year = String(year).substring(2, String(year).length);
	month = month >= 10 ? month : "0" + month;
	day = day >= 10 ? day : "0" + day;
	return year + "." + month + "." + day;
};

// 한화 ,000,000 표시
export const regexWON = (number) => {
	return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null;
};

// 일주일 전
export const getLastWeek = () => {
	$("#fromDate").datepicker("setDate", "-7D");
	$("#toDate").datepicker("setDate", "toDay");
};

// 1달 전
export const getLastMonth = () => {
	$("#fromDate").datepicker("setDate", "-1M");
	$("#toDate").datepicker("setDate", "toDay");
};

// 3달 전
export const getLast3Month = () => {
	$("#fromDate").datepicker("setDate", "-3M");
	$("#toDate").datepicker("setDate", "toDay");
};

// 6달 전
export const getLast6Month = () => {
	$("#fromDate").datepicker("setDate", "-6");
	$("#toDate").datepicker("setDate", "toDay");
};
