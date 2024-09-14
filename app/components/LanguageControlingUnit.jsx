export function Translate() {
  if (localStorage.getItem("lan") === "mn") {
    return {
      gameTitle:
        "Монголд 100 сая доллар ашиглан хэчнээн бараа худалдаж авах вэ?",
      fund: "үлдэгдэл хөрөнгө",
      million: "сая",
      mechanicKeyboard: "механик гар",
      monitor: "дэлгэц",
      price: "үнэ",
      name: "нэр",
      dollar: "usd",
    };
  }
  return {
    gameTitle:
      "How many items can you buy with 100 million dollars in Mongolia?",
    fund: "left fund",
    million: "million",
    mechanicKeyboard: "mechanic keyboard",
    monitor: "monitor",
    price: "price",
    name: "name",
    dollar: "usd",
  };
}
