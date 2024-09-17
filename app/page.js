"use client";

import { useEffect, useState } from "react";
import { Translate } from "./components/LanguageControlingUnit";
import { Items } from "./components/ItemControlingUnit";
import millify from "millify";

export default function Home() {
  const [pageState, setPageState] = useState({
    languageControlingUnit: {},
    currentFund: 100000000,
    items: [],
    quantityControllingStorage: {},
  });

  useEffect(() => {
    if (localStorage) {
      localStorage.setItem("lan", "us");
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
  console.log(pageState.currentFund);
  return (
    <div className="w-[100vw] mt-[30px] flex justify-center flex-col gap-[20px]">
      <div className="flex w-[100%] justify-center items-center h-[45px]">
        <p className="title ">{pageState.languageControlingUnit.gameTitle}</p>
        <div className="absolute right-[100px]">
          {/* <p>
            {pageState.languageControlingUnit.fund +
              ": " +
              (pageState.currentFund >= 1000000000
                ? (pageState.currentFund / 1000000000).toFixed(1) +
                  " billion (USD)"
                : pageState.currentFund >= 1000000
                ? pageState.currentFund.toString().substring(0, 3) +
                  " " +
                  pageState.languageControlingUnit.million +
                  " (USD)"
                : pageState.currentFund + " (USD)")}
          </p> */}
          <p>
            {pageState.languageControlingUnit.fund +
              ": " +
              millify(pageState.currentFund) +
              " USD"}
          </p>
        </div>
      </div>
      {/* items list go here */}
      <div className="flex gap-[50px] justify-center mt-[30px] flex-wrap overflow-y-auto">
        {pageState.items.map((e, index) => {
          return (
            <div
              key={index}
              className="w-[15%] p-[10px] overflow-hidden rounded-[10px] bg-[#b35e26] flex justify-center flex-col items-center h-[250px]"
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
