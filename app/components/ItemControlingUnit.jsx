import { Translate } from "./LanguageControlingUnit";

export function Items() {
  const translateModule = Translate();
  let data = [
    {
      image: "/mechanic_keyboard.webp",
      price: "23",
      name: translateModule.mechanicKeyboard,
      quantity: 0,
    },
    {
      image: "/monitor.webp",
      price: "881",
      name: translateModule.monitor,
      quantity: 0,
    },
    {
      image: "/cpu.webp",
      price: "617",
      name: "cpu",
      quantity: 0,
    },
    {
      image: "/lamborgin.webp",
      name: "Lamborghini",
      price: "302939",
      quantity: 0,
    },
    {
      image: "/tv.jpg",
      price: "2514",
      quantity: 0,
      name: "tv",
    },
    {
      image: "/kfc.png",
      price: 17,
      quantity: 0,
      name: "kfc",
    },
    ,
    {
      name: translateModule.jet,
      image: "/jet.jpg",
      quantity: 0,
      price: "2000000",
    },
    {
      name: translateModule.MongolianCashmere,
      image: "cashmere.jpg",
      quantity: 0,
      price: "275",
    },
    {
      name: translateModule.SnuffBottle,
      image: "snuffbottle.jpg",
      quantity: 0,
      price: "150",
    },
    // {
    //   name: translateModule.Mongoliantraditionalsnuffbottlebag,
    //   quantity: 0,
    //   price: "170",
    //   image: "daalin.jpg",
    // },
    // {
    //   name: translateModule.KingSilverBowl,
    //   price: "1250",
    //   quantity: 0,
    //   image: "/ayga.webp",
    // },
    // {
    //   name: translateModule.morinkhuur,
    //   quantity: 0,
    //   image: "/3tolgoi.webp",
    //   price: "8000",
    // },
    {
      name: translateModule.shartos,
      price: "1350",
      image: "/shartos.webp",
      quantity: 0,
    },
  ];
  return data.sort((a, b) => a.price - b.price);
}
