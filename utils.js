export const trimText = (text = "", limit) =>
 text.length > limit ? `${text.slice(0, limit)}...` : text;

export const formatDate = (date) => {
 const theDate = new Date(date);
 return theDate.toLocaleDateString("ko", {
  day: "numeric",
  month: "long",
  year: "numeric",
 });
};

export const code = (codes, code) => {
 return codes
  .filter((e) => {
   return e?.code == code;
  })
  .map((r) => {
   //console.log(r.code, ":", r.codeValue);
   return r?.codeValue;
  })[0];
};
