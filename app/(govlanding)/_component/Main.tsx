import React from "react"
import Image from "next/image"
import Link from "next/link"

import { currentUser } from "@/lib/auth"
import { Button } from "@/components/ui/button"

import MultiImageContainer from "./MultiImageContainer"
import People from "./People"
import styles from "./StyleSheet.module.css"
import { LanguageSelector } from "@/components/LanguageSelector"

const Main = async () => {
  const user = await currentUser()
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
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-green-400 to-black bg-clip-text text-transparent">
              Discover
            </span>{" "}
            government
          </h1>
          <h2 className="text-4xl font-semibold">schemes for you...</h2>
        </div>
        <br />
        <p className={`${styles.ele} text-[#888888] text-sm`}>
          The government is not your salvation. The government is not your road
          to prosperity. Hard work, education will take you far beyond what any
          government program can ever promise
        </p>
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
      <div className="absolute bottom-7 right-[22%] w-[300px]">
        <div className={`${styles.ele}`}>
          That government is the strongest of which every man feels himself a
          part
        </div>
      </div>
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

export default Main
