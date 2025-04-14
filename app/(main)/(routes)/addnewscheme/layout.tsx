import React from "react"

type AddNewSchemeLayoutProps = {
  children: React.ReactNode
}

const AddNewSchemeLayout = ({ children }: AddNewSchemeLayoutProps) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      {children}
    </div>
  )
}

export default AddNewSchemeLayout
