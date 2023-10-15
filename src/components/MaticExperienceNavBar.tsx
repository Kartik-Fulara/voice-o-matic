import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select"

import { X as Close } from "lucide-react"
import { invoke } from "@tauri-apps/api/tauri";
import { getData } from '@/helper/handleStore';




const MaticExperienceNavBar = ({ state, selectedCollection, setSelectedCollection }: any) => {

    const closeOverlay = () => {
        invoke("change_matic_experience")
    }
    return (
        <>
            <nav className='w-full  flex justify-between items-center px-6 flex-nowrap drag_app_region bg-black py-3'>
                {(state?.collections?.length as number) > 0 ? (<Select defaultValue={selectedCollection}>
                    <SelectTrigger onChange={(e) => setSelectedCollection(e)} className='bg-black no_drag_app_region h-full text-white border-none min-w-[150px] w-max border-[3px] border-black hover:ring-green-600 focus:ring-green-600 active:ring-green-500 rounded-none ring-offset-0 active:ring-offset-0 focus:ring-offset-0'>
                        <SelectValue className='text-white' placeholder="defaultCallOuts" />
                    </SelectTrigger>
                    <SelectContent className='no_drag_app_region bg-black text-white border-none'>
                        {
                            state?.collections?.map((collection: any) => (<SelectItem key={collection.collectionId} value={collection.collectionId}>{collection.collectionName}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>) : (
                    <>
                        No Collection Found
                    </>
                )}

                <div className='flex flex-nowrap gap-2 bg-black w-[215px] items-center justify-center h-full pl-4'>
                    <span className='text-[20px] text-white font-bold text-center whitespace-nowrap'>
                        Matic Experience
                    </span>

                    <span className='cursor-pointer w-full max-w-[30px] min-w-[30px] font-extrabold flex justify-center items-center h-[30px] border-black hover:border-green-700 border-[3px]  no_drag_app_region' onClick={closeOverlay}>
                        <Close size={15} />
                    </span>
                </div>
            </nav>
        </>
    )
}

export default MaticExperienceNavBar
