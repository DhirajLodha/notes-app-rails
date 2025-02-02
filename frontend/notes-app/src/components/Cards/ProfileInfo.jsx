import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({name = "Guest User", onLogout}) => {
  return (
    <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 ">
            {getInitials(name)}
        </div>
        <div>

        <div className="text-sm font-medium">{name ? name.charAt(0).toUpperCase() + name.slice(1) : "GUEST USER"}</div>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
            Logout
        </button>
        </div>


    </div>
  )
}

export default ProfileInfo
