"use client"
import React from 'react'

import TooltipContainer, {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MediaMenuPropsType } from '@/typings/globals';


const MediaMenu = ({ playAudioNow, audioUrl, mediaMenu, audioTime }: MediaMenuPropsType) => {

    return (
        <>
            {(audioTime?.duration !== `00` && playAudioNow === audioUrl) && <div className='flex gap-2 items-center'>
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
            {mediaMenu?.map((menu, index) => (
                menu.isDropdown ?
                    <DropdownMenu key={index}>
                        <DropdownMenuTrigger className='inline-flex'>
                            <TooltipContainer tooltip={menu.name}>
                                {menu.icon}
                            </TooltipContainer>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='bg-black text-white border-0'>
                            <DropdownMenuGroup>
                                {menu?.dropDownItems?.map((item: any) => (
                                    item.isDropdown ? (
                                        <DropdownMenuSub key={item.name}>
                                            <DropdownMenuSubTrigger className='bg-black text-white focus:text-black cursor-pointer data-[state=open]:text-black'>
                                                {item.name}
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuPortal >
                                                <DropdownMenuSubContent className='bg-black text-white focus:text-black border-none outline-none'>
                                                    {item?.dropDownItems?.map((subItem: any) => {
                                                        return (
                                                            <DropdownMenuItem key={`${item.name}-${subItem.name}`} className='bg-black text-white focus:text-black cursor-pointer'>
                                                                {subItem.name}
                                                            </DropdownMenuItem>
                                                        )
                                                    })}
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                    ) :
                                        <DropdownMenuItem key={`${menu.name}-${item.name}`} className='bg-black text-white focus:text-black'>
                                            {item.name}
                                        </DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu >
                    :
                    <TooltipProvider key={index}>
                        {menu.isOnClick ?
                            menu.isIconChange ? (<Tooltip>
                                {audioUrl!== "" && playAudioNow === audioUrl ? (
                                    <>
                                        <TooltipTrigger onClick={() => {
                                            menu?.onChangeClickFunction && menu.onChangeClickFunction()
                                        }}>
                                            {menu?.onChangeIcon}
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{menu?.onChangeName}</p>
                                        </TooltipContent>
                                    </>
                                ) : (
                                    playAudioNow === "" && (
                                        <>
                                            <TooltipTrigger onClick={() => {
                                                menu?.onClickFunction && menu?.onClickFunction(audioUrl)
                                            }} >
                                                {menu.icon}
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{menu.name}</p>
                                            </TooltipContent>
                                        </>
                                    )
                                )}
                            </Tooltip>) : (
                                <Tooltip>
                                    <TooltipTrigger onClick={() => menu?.onClickFunction && menu?.onClickFunction()}>
                                        {menu.icon}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{menu.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            )
                            :
                            menu.removeWhenPlaying ?
                                playAudioNow === "" && <Tooltip>
                                    <TooltipTrigger>
                                        {menu.icon}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{menu.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                                :
                                <Tooltip>
                                    <TooltipTrigger>
                                        {menu.icon}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{menu.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                        }
                    </TooltipProvider>
            )
            )}
        </>
    );
}

export default MediaMenu