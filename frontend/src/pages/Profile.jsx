import React from 'react'
import useUserStore from '../store/userStore'
import { Mail, User } from 'lucide-react';

function Profile() {
    const { info } = useUserStore();
    return (
        <div className='flex justify-center h-full'>
            <div className='flex-col text-center'>
                <div className="text-center p-5">
                    <h1 className="text-2xl font-semibold ">Profile</h1>
                    <p className="mt-2">Your profile information</p>
                </div>
                <div className="space-y-6">
                    <div className="space-y-1.5 max-w-screen sm:w-75 ">
                        <div className="text-sm text-medium-purple-950 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Full Name
                        </div>
                        <p className="px-4 py-2.5 bg-medium-purple-100 rounded-lg border">{info?.name}</p>
                    </div>

                    <div className="space-y-1.5">
                        <div className="text-sm text-medium-purple-950 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Address
                        </div>
                        <p className="px-4 py-2.5 bg-medium-purple-100 rounded-lg border">{info?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
