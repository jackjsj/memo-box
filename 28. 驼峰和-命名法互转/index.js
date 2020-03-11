const s1 = "get-element-by-id";
const s2 = "getElementById";

function trs1(s1) {
  return s1.replace(/(\-\w)/g, ($0, $1) => $1.slice(1).toUpperCase());
}

function trs2(s2) {
  return s2.replace(/([A-Z])/g, ($0, $1) => "-" + $1.toLowerCase());
}

console.log(trs1(s1));
console.log(trs2(s2));
