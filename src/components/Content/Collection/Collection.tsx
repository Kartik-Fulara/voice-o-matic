"use client"

import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'

import {
    Edit2 as EditIcon,
    Trash2 as DeleteIcon,
    Check as CheckIcon,
    X as CancelIcon,
    Plus as AddIcon
} from "lucide-react"



import { Input } from '@/components/ui/input'
import TooltipContainer from '@/components/ui/tooltip'
import OtherItems from "./OtherItems"
import { useCollectionContext } from '@/hooks/collectionContextHook'
import { useWindowsContext } from "@/hooks/windowContextHook"

const Collection = () => {

    const { state, changeCollectionName, removeCollection } = useCollectionContext()

    const { toggleChangeCollection } = useWindowsContext()

    const [collections, setCollections] = useState<any[]>([])

    const [collectionName, setCollectionName] = useState<string>(state?.selectedCollectionName || '')

    const [editOptions, setEditOptions] = useState(false)

    const [addItem, setAddItem] = useState(false)

    const [deleteItem, setDeleteItem] = useState(false)

    const changeCollectionNameHandler = () => {
        toggleChangeCollection()
        if (state?.selectedCollectionName !== collectionName && collectionName !== "") {
            changeCollectionName(state?.selectedCollection || "", collectionName || "")
            setEditOptions((val) => !val)
        }
    }

    const deleteCollection = () => {
        toggleChangeCollection()
        removeCollection(state?.selectedCollection || "")
    }

    useEffect(() => {
        let collectionData = state?.collections?.find((item) => item.collectionName === state?.selectedCollectionName)
        setCollections(collectionData?.otherCollectionItems || []);
    }, [state.selectedCollection])

    useEffect(() => {
        if (deleteItem) {
            setCollections(state?.collections?.find((item) => item.collectionName === state?.selectedCollectionName)?.otherCollectionItems || [])
            setDeleteItem(false)
        }
    }, [deleteItem])

    return (
        <section className="p-4 w-full flex flex-col gap-2 py-4">
            <div className='w-full flex justify-between items-center'>
                {editOptions ? (
                    <div className='flex items-center gap-4'>
                        <Input variant='bottomBorder' value={collectionName} onChange={(e) => setCollectionName(e.target.value)} autoFocus />
                        {(state?.selectedCollectionName !== collectionName && collectionName !== "") && (
                            <TooltipContainer tooltip='Change Collection Name'>
                                <CheckIcon className='cursor-pointer hover:text-green-600' onClick={() => changeCollectionNameHandler()} />
                            </TooltipContainer>
                        )}
                    </div>
                ) : (
                    <Label className='text-[16px] pl-4'>
                        {state?.selectedCollectionName}
                    </Label>
                )}
                <div className='flex items-center gap-4 pr-4'>
                    {editOptions ? (
                        <TooltipContainer tooltip='Cancel'>
                            <CancelIcon size={18} className='cursor-pointer hover:text-red-600' onClick={() => {
                                setEditOptions((val) => !val)
                                setCollectionName(state?.selectedCollectionName || '')
                            }} />
                        </TooltipContainer>
                    ) : (
                        <>
                            {state?.selectedCollectionName !== "Default Collection" && (<TooltipContainer tooltip='Edit'>
                                <EditIcon size={18} className='cursor-pointer hover:text-green-600' onClick={() => setEditOptions((val) => !val)} />
                            </TooltipContainer>)}
                            <TooltipContainer tooltip="Add Item">
                                <AddIcon onClick={() => setAddItem((val) => !val)} size={18} className='cursor-pointer hover:text-green-600' />
                            </TooltipContainer>
                        </>
                    )}
                    {state?.selectedCollectionName !== "Default Collection" && (<TooltipContainer tooltip='Delete'>
                        <DeleteIcon size={18} className='cursor-pointer hover:text-red-600' onClick={() => deleteCollection()} />
                    </TooltipContainer>)}
                </div>
            </div>
            <OtherItems setDeleteItem={setDeleteItem} collections={collections} addItem={addItem} setAddItem={setAddItem} />
        </section>
    )
}



export default Collection
