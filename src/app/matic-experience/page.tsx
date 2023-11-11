"use client"
import React, { useEffect, useState } from 'react'
import { SendHorizontal, ChevronRight, DownloadCloud, Pause, Play, PlusCircle, Speech, Trash } from "lucide-react"
import { InputWithButton } from '@components/ui/input'
import { CSSTransition } from "react-transition-group"
import { Button } from '@components/ui/button'
import MaticExperienceNavBar from "@components/MaticExperienceNavBar"
import handleTTS from '@/helper/handleTTS'
import dynamic from 'next/dynamic'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@components/ui/tooltip';
import handleTextToTalk from '@/helper/handleClickToTalk';
import { Label } from '@components/ui/label';
const AudioWrapper = dynamic(() => import('@/components/AudioWrapper'), {
    ssr: false,
})
import { getData } from '@/helper/handleStore'
import { WebviewWindow } from "@tauri-apps/api/window"

let audioTimeInit = {
    currentTime: `00`,
    duration: `00`,
}
const Page = () => {

    const [state, setState] = useState<any>([])

    const [selectedCollection, setSelectedCollection] = useState<any>(state?.selectedCollection || "Default_Collection")

    const maticWindow = WebviewWindow.getByLabel("maticExperience")

    useEffect(() => {
        getData("collectionData").then((res) => {
            console.log(res)
            setState(res)
        })
    }, [])

    useEffect(() => {
        getData("collectionData").then((res) => {
            console.log(res)
            setState(res)
        })
    }, [maticWindow?.isVisible()])


    const [inputValue, setInputValue] = React.useState('')

    const [openBtn, setOpenBtn] = React.useState(false)
    const [audioTime, setAudioTime] = useState(audioTimeInit)
    const [collectionItems, setCollectionItems] = useState([])
    const [playingAudio, setPlayingAudio] = useState("")

    useEffect(() => {
        const items = state?.collections?.filter((collection: any) => collection.collectionId === selectedCollection);
        setCollectionItems(items?.otherCollectionItems?.filter((item: any) => item.audioUrl !== "") || [])
    }, [selectedCollection])

    return (
        <main className='text-white  h-full w-full flex flex-col justify-start items-center gap-4 no_drag_app_region'>
            <MaticExperienceNavBar state={state} selectedCollection={selectedCollection} setSelectedCollection={setSelectedCollection} />

            <AudioWrapper
                key={playingAudio}
                playingAudio={playingAudio}
                setPlayingAudio={setPlayingAudio}
                audioTime={audioTime}
                setAudioTime={setAudioTime}
                removePlayingAudio={() => setPlayingAudio("")}
            />

            {collectionItems.length > 0 ? (
                <>
                    {collectionItems.map((item: any) => {
                        return (
                            <div key={item.audioUrl} className='flex items-center justify-center gap-3'>
                                {(audioTime?.duration !== `00` && playingAudio === (item.audioUrl || item.downloadUrl)) && <div className='flex gap-2 items-center'>
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
                                    <Tooltip>
                                        <TooltipTrigger onClick={() => handleTextToTalk({ audioPath: item.audioUrl as string })}>
                                            <Speech size={18} className='text-slate-300 hover:text-green-700' />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Speak {item.name} Audio
                                        </TooltipContent>
                                    </Tooltip>

                                    {playingAudio === "" && (<Tooltip>
                                        <TooltipTrigger onClick={() => {
                                            if (item.audioUrl === "") {
                                                setPlayingAudio(item.downloadUrl as string)
                                                return
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
                                    {playingAudio === (item.audioUrl || item.downloadUrl) && (
                                        <Tooltip>
                                            <TooltipTrigger onClick={() => {
                                                setPlayingAudio("")
                                            }}>
                                                <Pause size={18} className='text-slate-300 hover:text-yellow-500' />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Pause {item.name} Audio
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                </TooltipProvider>
                            </div>
                        )
                    })
                    }
                </>
            ) : (
                <>
                    <div className='w-full flex h-[40px] justify-between items-center px-4'>
                        <Label className='flex text-[20px] w-full items-center justify-center font-bold'>
                            No items found (Add Or Download Audios)
                        </Label>
                    </div>
                </>
            )}

            <section className='w-full flex justify-start items-start pl-[26px]'>
                <CSSTransition
                    in={openBtn}
                    classNames="ttSpeech"
                    timeout={300}
                >
                    <div className='ttsContainer'>
                        <Button onClick={() => setOpenBtn((val) => !val)} className='flex flex-nowrap justify-between items-center w-full bg-transparent border-0 ring-0   focus-visible:ring-offset-0 rounded-none focus-visible:ring-0 whitespace-nowrap   '>
                            Type to speak
                            <ChevronRight size={20} className='animateTTSIcon' />
                        </Button>
                        <div className='ttsBody'>
                            <p className='text-start w-full'>
                                Type what you want to say and press the send button to speak
                            </p>
                            <InputWithButton
                                parentClassName='text-white bg-black flex flex-nowrap p-0 no_drag_app_region ring-0 w-full'
                                buttonChildren={<SendHorizontal />}
                                buttonOnClick={() => handleTTS({
                                    text: inputValue
                                })}
                                placeholder='Type to speak'
                                className='bg-transparent text-white w-full h-full border-none outline-none rounded-none ring-0 px-4'
                                type='text'
                                value={inputValue}
                                alt='Type to speak'
                                buttonClassName="text-white w-[50px] h-full bg-green-600 border-none flex items-center justify-center hover:bg-green-700 p-0 rounded-none"
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </div>
                    </div>
                </CSSTransition>
            </section>
        </main>
    )
}

export default Page;
