"use client"
import React, { useEffect, useState } from 'react';
import SideBarStyle from "@styles/sidebar.module.css"
import { X as Close, Menu, Home, PlusCircle } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import uuid from '@helper/uuid';
import { useCollectionContext } from "@hooks/collectionContextHook";
import { Input } from '@components/ui/input';
import { useWindowsContext } from "@hooks/windowContextHook"

interface SidebarProps {
  sideBarOpen: boolean,
  setSideBarOpen: (sideBarOpen: boolean) => void
}

const Sidebar = ({
  sideBarOpen,
  setSideBarOpen
}: SidebarProps) => {

  const { state, removeSelectedCollection, setSelectedCollection, addCollection } = useCollectionContext()

  const { toggleChangeCollection } = useWindowsContext()

  const [openInput, setOpenInput] = useState(false)

  const [inputValue, setInputValue] = useState<string>("")

  const [error, setError] = useState<boolean>(false)

  const inputHandler = (e: string, keyType: string) => {

    if (state?.collections?.map((item) => item.collectionName).includes(e)) {
      setError(true)
      return
    }

    if (keyType === "Enter" && e !== "") {
      // capitalize first letter of each word
      toggleChangeCollection()
      let collectionName = e.replace(/\s+/g, '_').toLowerCase().split('_').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join('')

      let newCollectionName = e.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')

      addCollection({
        collectionId: collectionName + "-" + uuid(),
        collectionName: newCollectionName,
        isOnAutoDetection: false,
        isOnQuickMenu: false,
        otherCollectionItems: [],
        detectionCollection: null,
        quickMenuCollection: null,
      })

      setInputValue("")
      setOpenInput(false)
    }

    if (keyType === "Escape") {
      setInputValue("")
      setOpenInput(false)
    }

    setError(false)
  }

  const setCollectionHandler = (collectionName: string) => {
    toggleChangeCollection()
    if (collectionName === "home") {
      removeSelectedCollection()
      return
    }
    setSelectedCollection(collectionName)
  }

  return (

    <section className={`${SideBarStyle.sidebar}`}>
      <div className={SideBarStyle.topSideBar}>
        <div className={SideBarStyle.windowBarLeft}>
          <span className={SideBarStyle.windowBarHeading}>
            Voice`O`Matic
          </span>
        </div>
        <div className='w-full flex flex-col mt-4'>
          <div className='flex items-center justify-between'>
            <Label className='text-sm text-white w-full select-none'>
              My Collections
            </Label>
            <Button variant='none' className='text-white text-sm outline-none' onClick={() => setOpenInput(true)}>
              <PlusCircle size={18} />
            </Button>
          </div>
          <div className='flex p-4 flex-col w-full gap-4'>
            {state?.collections?.map((item) => {
              return (
                <Button variant='none' key={item.collectionId} className={`${SideBarStyle.collectionCard} ${item.collectionName === state?.selectedCollectionName && SideBarStyle.collectionCardSelected} outline-none`} onClick={() => setCollectionHandler(item.collectionName)}>
                  {item.collectionName}
                </Button>
              )
            })}

            {openInput && <Input
              autoFocus
              onKeyDownCapture={(e) => inputHandler(inputValue, e.key)}
              onBlur={() => {
                setOpenInput(false)
                setError(false)
              }}
              onChange={(e) => {
                setInputValue(e.target.value)
                setError(false)
              }}
              className={` outline-none ring-0  w-full border-t-0 border-r-0 border-l-0 focus-visible:ring-0 focus-visible:ring-offset-0  focus-visible:outline-none bg-transparent border-b-2 border-white rounded-none p-0 ${error && "border-red-600 text-red-600"}`} />}
            {error && <span className='text-red-600 text-sm whitespace-normal'>Collection name already exists</span>}
          </div>
        </div>
      </div>
      <div className={SideBarStyle.bottomSideBar}>
        <Button onClick={() => setCollectionHandler("home")} size="sm" className='flex gap-2 flex-nowrap w-full bg-raisinBlackLighter hover:ring-2 hover:ring-green-600 hover:bg-black border-0 focus-visible:border-none focus-visible:ring-offset-0 active:ring-green-600 focus-visible:ring-green-600 focus:bg-black focus-within:ring-green-600 focus-within:bg-black focus:ring-green-600 outline-none'>
          <Home size={18} />
          <span className='text-sm'>
            Home
          </span>
        </Button>

        {/* <Button variant='default' size="sm" className='flex gap-2 flex-nowrap w-full bg-raisinBlackLighter hover:ring-2 hover:ring-green-600 hover:bg-black border-0 focus-visible:border-none focus-visible:ring-offset-0 active:ring-green-600 focus-visible:ring-green-600 focus:bg-black focus-within:ring-green-600 focus-within:bg-black focus:ring-green-600 outline-none'>
            Sign In
          </Button> */}
      </div>
    </section>

  )
}

export default Sidebar;
