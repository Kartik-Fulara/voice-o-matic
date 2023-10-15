
'use client'
import { InputWithButton } from './ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@components/ui/dropdown-menu'

import { DownloadCloud, SendHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import { useAudioContext } from "@hooks/audioContextHook"
import handleTTS from '@/helper/handleTTS'
import { Progress } from './ui/progress'
import downloadFiles from '@/helper/downloadFiles'


type contentNavBarProps = {
    selectedCollection: string,
}

const ContentNavbar = ({
    selectedCollection,
}: contentNavBarProps) => {
    const [text, setText] = useState<string>("")

    const { state } = useAudioContext()

    return (
        <div className={`flex gap-4 flex-wrap items-center justify-center ${selectedCollection === "home" ? "sm:justify-between" : "sm:justify-start"} px-4 w-full`}>
            <div className='flex items-center justify-center gap-4 flex-wrap'>
                <InputWithButton
                    parentClassName='text-white bg-black flex flex-nowrap p-0 no_drag_app_region ring-0 w-[350px]'
                    placeholder='Type to speak'
                    className='bg-transparent text-white w-full h-full border-none outline-none rounded-none ring-0 px-4'
                    type='text'
                    alt='Type to speak'
                    buttonChildren={<SendHorizontal />}
                    buttonClassName="text-white w-[50px] h-full bg-green-600 border-none flex items-center justify-center hover:bg-green-700 p-0 rounded-none"
                    onChange={(e) => setText(e.target.value)}
                    buttonOnClick={() => handleTTS({
                        text: text
                    })}
                />
            </div>
            {state?.downloadingAudio.length > 0 && <div className='flex items-center justify-center gap-4 flex-wrap'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='relative flex items-center justify-center gap-4 h-10  min-w-[2.5rem] w-10 rounded-full bg-black hover:ring-green-600 focus:ring-2 focus:ring-green-600 focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-0 focus-within:border-0 focus-visible:border-0 ring-offset-0 focus:ring-offset-0 focus-within:ring-offset-0 border-0 active:ring-2 hover:bg-green-600 active:ring-green-600 focus-visible:outline-none'>
                        <DownloadCloud size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='bg-black text-white border-0'>
                        {state?.downloadingAudio?.map((download) => {
                            return (
                                <DropdownMenuItem key={download.url} className='hover:bg-transparent focus:bg-transparent cursor-pointer'>
                                    <div className='flex w-full justify-between items-center'>
                                        <span>
                                            {download.name}
                                        </span>
                                        <span className='flex whitespace-nowrap gap-1 items-center justify-center'>
                                            {download.progress}
                                            /
                                            {download.total}
                                        </span>
                                    </div>
                                    {/* create progress bar */}
                                    <Progress value={Math.floor(Math.round((Number(download.progress) / Number(download.total)) * 100))} />
                                </DropdownMenuItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>}
        </div>
    )
}

export default ContentNavbar
