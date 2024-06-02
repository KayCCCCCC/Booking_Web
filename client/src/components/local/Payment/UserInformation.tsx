import { Input } from "@/components/global/atoms/input"
import { RootState } from "@/store/store"
import React from "react"
import { useSelector } from "react-redux"
import AlertUpdate from "./AlertUpdate"

const UserInformation = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <div>
      <h2 className="p-3 font-semibold uppercase text-rose-600">User information</h2>
      <div className="flex flex-col gap-3">
        <div>
          <label>Email</label>
          <Input value={user.email} readOnly />
        </div>
        <div>
          <label>Name</label>
          <Input value={user.name} readOnly />
        </div>

        {user.phone === null ? (
          <div className="flex justify-between">
            <p className="text-red-500">Your phone has not update!</p>
            <AlertUpdate nameType="Phone" email={user.email} />
          </div>
        ) : (
          <div>
            <label>Phone Number</label>
            <Input value={user.phone} readOnly />
          </div>
        )}
      </div>
    </div>
  )
}

export default UserInformation
