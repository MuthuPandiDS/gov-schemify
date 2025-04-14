"use client"
import Header from "./_component/Header"
import Main from "./_component/Main"

export default async function Home() {
  return (
    <div className="h-full w-full p-8">
      <Header />
      <Main />
    </div>
  )
}
