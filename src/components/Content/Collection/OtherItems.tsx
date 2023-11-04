"use client"
import MediaMenu from '@/components/MediaMenu'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import React, { useEffect, useState, ChangeEvent } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { open } from "@tauri-apps/api/dialog"
import {
    Play,
    Pause,
    Trash,
    Speech,
    X as CloseIcon,
    DownloadCloud
} from "lucide-react"
import dynamic from 'next/dynamic'

import { MediaMenuType, OtherItemsType } from '@/typings/globals'
import { useAudioContext } from '@/hooks/audioContextHook'
import { useCollectionContext } from '@hooks/collectionContextHook'
import { useWindowsContext } from '@hooks/windowContextHook'
const AudioWrapper = dynamic(() => import('@/components/AudioWrapper'), {
    ssr: false,
})
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import uuid from '@/helper/uuid'
import handleTextToTalk from '@/helper/handleClickToTalk'

let audioTimeInit = {
    currentTime: `00`,
    duration: `00`,
}


const OtherItems = ({ collections, addItem, setAddItem, setDeleteItem }: OtherItemsType) => {

    const { state, setCollectionItems, removeCollectionItem, toggleDownloading } = useCollectionContext()

    const { toggleChangeCollection } = useWindowsContext()

    const audioMediaHandler: Array<MediaMenuType> = [
        {
            name: "Play Audio",
            icon: <Play size={18} className='text-slate-300 hover:text-green-500' />,
            isOnClick: true,
            isIconChange: true,
            onClickFunction: (val?: string) => {
                if (!val) return
                setPlayingAudio(val)
            },
            onChangeName: "Pause Audio",
            onChangeIcon: <Pause size={18} className='text-slate-300 hover:text-yellow-500' />,
            onChangeClickFunction: () => removePlayingAudio(),
            isDropdown: false,
        },
        {
            name: "Remove Audio",
            icon: <CloseIcon size={18} className='text-slate-300 hover:text-red-500' />,
            isDropdown: false,
            isOnClick: true,
            onClickFunction: () => {
                setAudioLoc("")
                setAudioName("")
                removePlayingAudio()
            }
        },
    ]

    const [audioLoc, setAudioLoc] = useState<string>("")
    const [audioName, setAudioName] = useState<string>("")
    const [audioTime, setAudioTime] = useState(audioTimeInit)

    const {
        state: { playingAudio },
        setPlayingAudio,
        removePlayingAudio,
        setDownloadingAudio
    } = useAudioContext()

    const onChangeHandler = async () => {
        const selected = await open({
            multiple: false,
            filters: [{
                extensions: ["mp3", "wav", "ogg", "m4a", "flac"],
                name: "Audio Files",
            }],
        })
        if (selected === null || selected === undefined) return
        let name = (selected as string)?.split("\\")[(selected as string).split("\\").length - 1]
        setAudioTime(audioTimeInit)
        setAudioLoc(`${selected}`)
        if (name && audioName === "") setAudioName(name)
    }


    useEffect(() => {
        if (audioLoc === playingAudio) {
            removePlayingAudio()
        }
        if (!addItem) {
            setAudioLoc("")
            setAudioName("")
        }
    }, [addItem])

    const addCollectionItem = () => {
        console.log("coming here")
        toggleChangeCollection()

        let audioID = audioName.replace(" ", "_") + "-" + uuid();

        setCollectionItems({
            collectionId: state.selectedCollection ?? "",
            collectionItem: {
                id: audioID,
                name: audioName,
                audioUrl: audioLoc,
                isOnline: false,
                isLocal: true,
            }
        })

        setAudioLoc("")
        setAudioName("")
        setAddItem(false)
    }

    const removeCollectionItemHandler = (collectionItemId: string) => {
        toggleChangeCollection()
        setDeleteItem(true)
        console.log(collectionItemId)
        removeCollectionItem({
            collectionId: state.selectedCollection ?? "",
            collectionItemId: collectionItemId
        })
    }

    const addToDownload = (url: string, name: string, id: string) => {
        toggleDownloading({
            collectionId: state.selectedCollection ?? "",
            collectionItemId: id ?? ""
        })
        setDownloadingAudio({
            name: name,
            url: url,
        })
    }

    return (
        <section>
            <AudioWrapper
                key={playingAudio}
                playingAudio={playingAudio!}
                setPlayingAudio={setPlayingAudio}
                audioTime={audioTime}
                setAudioTime={setAudioTime}
                removePlayingAudio={removePlayingAudio}
            />
            {
                collections.length !== 0 && collections?.map((item, index) => {
                    if (!item.onAutoDetection && !item.onQuickMenu) {
                        return (
                            <>
                                <Separator className="bg-slate-400" />
                                <div key={item.id} className='w-full flex h-[40px] justify-between items-center px-4'>
                                    <Label className='flex text-[12px] font-bold'>
                                        {item.name}
                                    </Label>
                                    <div className='flex items-center justify-center gap-3'>
                                        {(audioTime?.duration !== `00` && playingAudio === (item.audioUrl ?? item.downloadUrl)) && <div className='flex gap-2 items-center'>
                                            <span>
                                                {audioTime?.currentTime}
                                            </span>
                                            <span>
                                                /
                                            </span>
                                            <span>
                                                {audioTime?.duration}
                                            </span>
                                        </div>}
                                        <TooltipProvider>
                                            {!item.isLocal ? (<Tooltip>
                                                <TooltipTrigger onClick={() => addToDownload(item.downloadUrl as string, item.name, item.id)}>
                                                    <DownloadCloud size={18} className='text-slate-300 hover:text-green-500' />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    Download {item.name} Audio
                                                </TooltipContent>
                                            </Tooltip>) : (
                                                <Tooltip>
                                                    <TooltipTrigger onClick={() => handleTextToTalk({ audioPath: item.audioUrl as string })}>
                                                        <Speech size={18} className='text-slate-300 hover:text-green-700' />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        Speak {item.name} Audio
                                                    </TooltipContent>
                                                </Tooltip>
                                            )}
                                            {playingAudio === "" && (<Tooltip>
                                                <TooltipTrigger onClick={() => {
                                                    setAddItem(false)
                                                    if (item.audioUrl === "") {
                                                        setPlayingAudio(item.downloadUrl as string)
                                                    } else {
                                                        setPlayingAudio(item.audioUrl as string)
                                                    }
                                                }}>
                                                    <Play size={18} className='text-slate-300 hover:text-green-500' />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    Play {item.name} Audio
                                                </TooltipContent>
                                            </Tooltip>
                                            )}
                                            {playingAudio === (item.audioUrl ?? item.downloadUrl) && (
                                                <Tooltip>
                                                    <TooltipTrigger onClick={() => {
                                                        removePlayingAudio()
                                                    }}>
                                                        <Pause size={18} className='text-slate-300 hover:text-yellow-500' />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        Pause {item.name} Audio
                                                    </TooltipContent>
                                                </Tooltip>
                                            )}
                                            {!item.isOnline && (
                                                <Tooltip>
                                                    <TooltipTrigger onClick={() => removeCollectionItemHandler(item.id)}>
                                                        <Trash size={18} className='text-slate-300 hover:text-red-500' />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        Delete {item.name} Audio
                                                    </TooltipContent>
                                                </Tooltip>
                                            )}
                                        </TooltipProvider>
                                    </div>
                                </div>
                                {collections.length === (index + 1) && <Separator className="bg-slate-400" />}
                            </>
                        )
                    } else {
                        return null
                    }
                })
            }
            {
                (collections.length === 0 && !addItem) && (
                    <div className='w-full flex h-[40px] justify-between items-center px-4'>
                        <Label className='flex text-[20px] w-full items-center justify-center font-bold'>
                            No items found
                        </Label>
                    </div>
                )
            }
            <div className={`w-full ${!addItem && "hidden"}`}>
                {collections.length === 0 && <Separator className="bg-slate-400" />}
                <div className='flex justify-between items-center h-[80px]'>
                    <Input value={audioName} onChange={(e: ChangeEvent<HTMLInputElement>) => setAudioName(e.target.value ?? "")} variant='bottomBorder' autoFocus className='w-[10rem]' />
                    {(audioLoc !== "") ?
                        <div className='flex items-center justify-center gap-3'>
                            <MediaMenu
                                mediaMenu={audioMediaHandler}
                                playAudioNow={playingAudio!}
                                audioUrl={audioLoc}
                                audioTime={audioTime}
                            />
                        </div>
                        : (<Label onClick={() => onChangeHandler()} className={`cursor-pointer w-[210px] border-[1px] border-white border-dashed hover:border-green-600 text-center p-4`}>
                            Browse Audio
                        </Label>)}

                    <Button onClick={() => addCollectionItem()} variant='success' disabled={(audioName === "" && audioLoc === "")}>
                        Add Item
                    </Button>

                </div>
            </div>
        </section>
    )
}

export default OtherItems
