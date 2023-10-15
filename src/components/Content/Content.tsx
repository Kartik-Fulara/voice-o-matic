"use client"

import React, { useEffect, useState, useRef } from 'react'
import ContentStyle from "@styles/content.module.css"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { useCollectionContext } from '@/hooks/collectionContextHook'
import { useWindowsContext } from '@/hooks/windowContextHook'
import uuid from '@/helper/uuid'

const Content = () => {

    const { state, setSelectedCollection, addCollection } = useCollectionContext()

    const { toggleChangeCollection } = useWindowsContext()

    const [openAddCollectionDialog, setOpenAddCollectionDialog] = useState(false)

    const [collectionName, setCollectionName] = useState<string>("")
    const [error, setError] = useState<{
        isError: boolean,
        message: string
    }>({
        isError: false,
        message: ""
    })
    

    const addCollectionHandler = () => {
        console.log("comming here")
        const collectionsName = state?.collections?.map((item) => item.collectionName)

        if (collectionName === "") {
            setError({
                isError: true,
                message: "Collection Name Cannot Be Empty"
            })
            return
        } else if (collectionsName?.includes(collectionName)) {
            setError({
                isError: true,
                message: "Collection Name Already Exists"
            })
            return
        } else {
            toggleChangeCollection()

            
            let collectName = collectionName.split(" ").map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(" ")
            let collectionId = collectName + "-" + uuid();

            addCollection({
                collectionName: collectName,
                collectionId: collectionId,
                isOnAutoDetection: false,
                isOnQuickMenu: false,
                otherCollectionItems: [],
                detectionCollection: null,
                quickMenuCollection: null,
            })

            setCollectionName("")
            setError({
                isError: false,
                message: ""
            })
            setOpenAddCollectionDialog(false)
        }
    }

    const setCollectionHandler = (collectionName: string) => {
        toggleChangeCollection()
        setSelectedCollection(collectionName)
    }

    return (
        <section className="p-4 flex flex-col overflow-y-auto overflow-x-hidden gap-4 w-full h-full">
            <Label className='w-full text-[20px]'>
                My Collections
            </Label>
            <div className='flex flex-wrap gap-4 w-full justify-start items-start overflow-auto px-3 py-2'>
                {state?.collections?.map((item) => {
                    return (
                        <Button key={item.collectionId} className={`${ContentStyle.collectionCard}`} onClick={() => setCollectionHandler(item.collectionName)}>
                            {item.collectionName}
                        </Button>
                    )
                })}
                <div className='w-full h-max'>
                    <Dialog open={openAddCollectionDialog} onOpenChange={setOpenAddCollectionDialog}>
                        <DialogTrigger asChild>
                            <Button className={`${ContentStyle.addCollection}`} onClick={() => setOpenAddCollectionDialog(true)}>
                                <PlusCircle size={18} />
                                <span>
                                    Add Collection
                                </span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-full sm:max-w-[425px] gap-5">
                            <DialogHeader className='m-0 p-0'>
                                <DialogTitle>Add New Collection</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col items-start gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Collection Name
                                </Label>
                                <Input
                                    id="name"
                                    placeholder='Collection Name'
                                    className={`${error && "ring-red-600 focus-visible:ring-red-600 border-red-600 outline-red-600"} col-span-3 ring-offset-0 focus-visible:ring-offset-0`}
                                    onChange={(e) => setCollectionName(e.target.value)}
                                    defaultValue={""}
                                />
                                {error.isError && <DialogDescription className='text-red-600'>{error.message}</DialogDescription>}
                            </div>
                            <DialogFooter>
                                <Button onClick={() => addCollectionHandler()} variant='success' type="submit">Add Collection</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </section>
    )
}

export default Content
