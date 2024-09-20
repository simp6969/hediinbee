"use client";

import { useEffect, useState } from "react";
import { Translate } from "./components/LanguageControlingUnit";
import { Items } from "./components/ItemControlingUnit";
import millify from "millify";
import { useRouter } from "next/navigation";

export default function Home() {
  const [pageState, setPageState] = useState({
    languageControlingUnit: {},
    currentFund: 100000000,
    items: [],
    quantityControllingStorage: {},
  });
  const router = useRouter();

  useEffect(() => {
    if (localStorage) {
      const translateModule = Translate();
      setPageState({
        ...pageState,
        languageControlingUnit: translateModule,
        items: Items(),
      });
    }
  }, []);

  function handleQuantityChange(name, change, price, quantity) {
    setPageState((prevState) => {
      if (change === 0 || (change > 0 && prevState.currentFund < price)) {
        return prevState;
      }

      const newQuantity = Math.max(quantity + change, 0);

      if (change < 0 && !prevState.currentFund + price >= 100000000) {
        return prevState;
      }

      const newFund =
        change > 0
          ? prevState.currentFund - price
          : prevState.currentFund + price;
      if (newFund > 100000000) {
        return prevState;
      }
      return {
        ...prevState,
        items: prevState.items.map((item) =>
          item.name === name ? { ...item, quantity: newQuantity } : item
        ),
        currentFund: newFund,
      };
    });
  }

  if (!pageState.languageControlingUnit.million && !pageState.imageLoaded) {
    return (
      <div className="w-[100vw] h-[100vh] mt-[30px] flex items-center flex-col gap-[20px]">
        <div className="h-[45px] w-[60vw] rounded-[3px] loadingGradient"></div>
        <div className="flex gap-[50px]  justify-center w-[100vw] h-[230px]">
          <div className="loadingGradientImage flex justify-center w-[15%] h-[100%]"></div>
          <div className="loadingGradientImage flex justify-center w-[15%] h-[100%]"></div>
          <div className="loadingGradientImage flex justify-center w-[15%] h-[100%]"></div>
          <div className="loadingGradientImage flex justify-center w-[15%] h-[100%]"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-[100vw] flex justify-center flex-col gap-[20px]">
      <div className="flex sticky top-[0px] h-[100px] bg-[#9c5322] justify-around headers w-[100%] items-center">
        <p className="title">{pageState.languageControlingUnit.gameTitle}</p>
        <div className="flex gap-[10px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={30}
            height={30}
            fill="#f7a570"
            viewBox="0 0 640 512"
            onClick={() => {
              if (localStorage.getItem("lan") === "mn") {
                localStorage.setItem("lan", "en");
              } else {
                localStorage.setItem("lan", "mn");
              }
              location.reload();
            }}
          >
            <path d="M0 128C0 92.7 28.7 64 64 64l192 0 48 0 16 0 256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64l-256 0-16 0-48 0L64 448c-35.3 0-64-28.7-64-64L0 128zm320 0l0 256 256 0 0-256-256 0zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1 73.6 0 8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276l-38 0 19-42.8zM448 164c11 0 20 9 20 20l0 4 44 0 16 0c11 0 20 9 20 20s-9 20-20 20l-2 0-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45L448 228l-72 0c-11 0-20-9-20-20s9-20 20-20l52 0 0-4c0-11 9-20 20-20z" />
          </svg>
          <div className="70px max-[385px]:h-[90px] max-[385px]:text-center flex items-center">
            <p>
              {pageState.languageControlingUnit.fund +
                ": " +
                millify(pageState.currentFund) +
                " USD"}
            </p>
          </div>
        </div>
      </div>
      {/* items list go here */}
      <div className="flex gap-[50px] p-[30px] pt-[10px] justify-center mt-[10px] flex-wrap overflow-y-auto">
        {pageState.items.map((e, index) => {
          return (
            <div
              key={index}
              className="w-[200px] items p-[10px] overflow-hidden rounded-[10px] bg-[#b35e26] flex justify-center flex-col items-center h-[250px]"
            >
              <div className="w-[50%] h-[90%] flex justify-center">
                <img
                  className="rounded-[20px]"
                  onLoad={() =>
                    setPageState({ ...pageState, imageLoaded: true })
                  }
                  src={e.image}
                ></img>
              </div>
              <div className="text-center">
                <p>
                  {pageState.languageControlingUnit.name}: {e.name}
                </p>
                <p>
                  {pageState.languageControlingUnit.price}: {e.price}{" "}
                  {pageState.languageControlingUnit.dollar}
                </p>
                <div className="flex justify-center items-center">
                  <svg
                    height="30"
                    width="30"
                    fill="#f7a570"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    onClick={() =>
                      handleQuantityChange(
                        e.name,
                        1,
                        Number(e.price),
                        e.quantity
                      )
                    }
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                  </svg>
                  <p className="text-[20px] w-[20px]">
                    {pageState.items[index].quantity}
                  </p>
                  <svg
                    height="30"
                    width="30"
                    fill="#f7a570"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    onClick={() =>
                      handleQuantityChange(
                        e.name,
                        -1,
                        Number(e.price),
                        e.quantity
                      )
                    }
                  >
                    <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
