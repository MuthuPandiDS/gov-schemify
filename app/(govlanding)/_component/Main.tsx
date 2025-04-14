"use client"

import React from "react"
import Image from "next/image"
import { useTranslation } from "react-i18next"

import People from "./People"
import styles from "./StyleSheet.module.css"

export default function Main() {
  const { t, i18n } = useTranslation()
  const isTamil = i18n.language === "ta"

  return (
    <div className="grid grid-cols-1">
      <div className="grid grid-cols-2 gap-5 md:grid-cols-2 sm:grid-cols-1 justify-between w-[40%]">
        <Image
          src={"/images/womens.jpg"}
          width={200}
          height={200}
          alt="womens"
          className={`${styles.women}`}
        ></Image>
        <People />
      </div>
      <div className="w-6/12 mt-14 z-10">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">
            {isTamil ? (
              <>
                <span className="bg-gradient-to-r from-green-400 to-black bg-clip-text text-transparent">
                  {t("discover")}
                </span>{" "}
                {t("government")} {t("schemesForYou")}
              </>
            ) : (
              <>
                <span className="bg-gradient-to-r from-green-400 to-black bg-clip-text text-transparent">
                  {t("discover")}
                </span>{" "}
                {t("government")} {t("schemesForYou")}
              </>
            )}
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            {t("pludge")}
          </p>
        </div>
      </div>
      <div
        className={`${styles.big_farmer} w-[35%] h-[85vh] bg-cover bg-no-repeat absolute top-24 right-4`}
      >
        <Image
          src={"/images/farmerCartoon.png"}
          alt="farmer"
          fill
          className="object-cover"
        />
      </div>
      <div></div>
      <Image
        src={"/images/grnHeart.png"}
        alt="grnHeart"
        width={100}
        height={100}
        className="absolute bottom-0 left-0 right-[22%]"
      />
    </div>
  )
}
