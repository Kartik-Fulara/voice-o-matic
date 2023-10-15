"use client"
import React, { useEffect, useState } from 'react'
import { Group as OverlayIcon, Mic, Minus, X as Close, Minimize2, Maximize2, Menu } from 'lucide-react'

import NavBarStyle from "@styles/navbar.module.css"

import { invoke } from '@tauri-apps/api/tauri'

import { isRegistered, register, registerAll, unregister, unregisterAll } from "@tauri-apps/api/globalShortcut"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@components/ui/dialog"

import { Checkbox } from "@components/ui/checkbox"

import { Label } from '@components/ui/label'

import { Button } from '@components/ui/button'

interface NavBarProps {

    sideBarOpen: boolean,
    setSideBarOpen: (sideBarOpen: boolean) => void

}
import { useCollectionContext } from "@hooks/collectionContextHook";
import useWindowsContext from '@hooks/windowContextHook'
import { saveStore, setData } from '@/helper/handleStore'


const Navbar = ({
    sideBarOpen,
    setSideBarOpen
}: NavBarProps) => {

    useEffect(() => {

        const closeMaticWindow = [
            "CONTROL + SHIFT + Backquote",
        ]

        const handleGlobalShortCut = async (event: string) => {

            switch (event) {
                case "register":
                    await registerAll(closeMaticWindow, (shortcut) => {
                        // console.log(`Shortcut pressed: ${shortcut}`)
                        invoke("change_matic_experience")
                    })
                    break;
                case "unregister":
                    await unregisterAll()
                    break;
            }
        }

        handleGlobalShortCut("register")

        return () => {
            handleGlobalShortCut("unregister")
        }
    }, [])

    const {
        state
    } = useCollectionContext()

    const { state: {
        maximize,
        rememberSelect,
        
    },  setRememberSelect,setMaximize } = useWindowsContext()

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    let iconSize = 20;

    const maximizeWindow = () => {

        if (maximize) {
            invoke("change_app_window", {
                event: "unmaximize"
            }).then(() => {
                setMaximize(false)
            }).catch((err) => {
                console.log(err)
            })
        }
        else {
            invoke("change_app_window", {
                event: "maximize"
            }).then(() => {
                setMaximize(true)
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const minimizeWindow = () => {
        setIsDialogOpen(false);

        if (rememberSelect?.selected && rememberSelect?.selectedType === "") {
            invoke("change_app_window", {
                event: "minimize"
            }).then(() => {
                setRememberSelect({
                    selected: rememberSelect.selected,
                    selectedType: "minimize"
                })
                setData({
                    key: "rememberSelect",
                    value: {
                        selected: rememberSelect.selected,
                        selectedType: "minimize"
                    }
                })
                saveStore()
            }).catch((err) => {
                console.log(err)
            })
            return;
        }

        invoke("change_app_window", {
            event: "minimize"
        })
        invoke("changeTrayLabel")
    }

    const closeWindow = (isClose = true) => {
        if (!rememberSelect.selected && rememberSelect.selectedType === "") {
            setIsDialogOpen(isClose);
            unregisterAll();
            invoke("change_app_window", {
                event: "quit"
            })
            return;
        }

        if (rememberSelect.selected && rememberSelect.selectedType === "") {
            setRememberSelect({
                selected: rememberSelect.selected,
                selectedType: "close"
            })
            setData({
                key: "rememberSelect",
                value: {
                    selected: rememberSelect.selected,
                    selectedType: "close"
                }
            })
            saveStore()
            setIsDialogOpen(false);
            unregisterAll();
            invoke("change_app_window", {
                event: "quit"
            })
            return;
        }

        if (rememberSelect.selected && rememberSelect.selectedType === "close") {
            setIsDialogOpen(false);
            unregisterAll();
            invoke("change_app_window", {
                event: "quit"
            })
            return;
        } else {
            setIsDialogOpen(false);
            invoke("change_app_window", {
                event: "minimize"
            })
            return;
        }
    }

    const closeButton = () => {
        setIsDialogOpen(false);
        if (!rememberSelect?.selected) {
            setIsDialogOpen(true)
            return;
        }
        rememberSelect.selectedType === "close" ? closeWindow() : minimizeWindow();
    }


    return (

        <nav data-tauri-drag-region className={NavBarStyle.navBar}>

            <div className={NavBarStyle.windowBarLeft} data-tauri-drag-region>
                {state?.selectedCollectionName !== "home" && <span className='sm:hidden'>
                    {sideBarOpen ? <Close className='no_drag_app_region cursor-pointer' onClick={() => setSideBarOpen(!sideBarOpen)} /> : <Menu className='no_drag_app_region cursor-pointer' onClick={() => setSideBarOpen(!sideBarOpen)} />}
                </span>}
                <span data-tauri-drag-region className={NavBarStyle.windowBarHeading}>
                    Voice`O`Matic
                </span>
            </div>
            <div className={NavBarStyle.windowBarRight} data-tauri-drag-region>
                <div className={NavBarStyle.windowControlsWrapper}>
                    <Button variant="ghost" size="icon" className={`${NavBarStyle.windowControl} no_drag_app_region`} onClick={() => maximizeWindow()}>
                        {!maximize ?
                            <Maximize2 size={iconSize} /> :
                            <Minimize2 size={iconSize} />
                        }
                    </Button>


                    <Button variant="ghost" size="icon" className={`${NavBarStyle.windowControl} no_drag_app_region`} onClick={() => minimizeWindow()}>
                        <Minus size={iconSize} />
                    </Button>

                    <Dialog open={rememberSelect?.selectedType === "" ? isDialogOpen : false} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild className='no_drag_app_region'>
                            <Button onClick={() => closeButton()} size="icon" variant="ghost" className={`${NavBarStyle.windowControl} ${NavBarStyle.closeIcon} no_drag_app_region `}>
                                <Close size={iconSize} />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='w-full rounded-lg '>
                            <DialogHeader>
                                <DialogTitle>Close Voice`O`Matic</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to close Voice`O`Matic?
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className={NavBarStyle.dialogFooterContainer}>
                                <div className={`${NavBarStyle.checkBoxWrapper}  no_drag_app_region`}>
                                    <Checkbox id="terms" className='no_drag_app_region' checked={rememberSelect?.selected} onClick={() => setRememberSelect({
                                        selected: !rememberSelect?.selected,
                                        selectedType: ""
                                    })} />
                                    <Label htmlFor="terms" className="no_drag_app_region" >Remember My Selection</Label>
                                </div>
                                <div className='flex flex-col gap-[10px] sm:flex-row '>
                                    <Button variant="destructive" className="no_drag_app_region btn btn--primary" onClick={() => closeWindow(false)}>
                                        Close Voice`O`Matic
                                    </Button>
                                    <Button variant='ghost' className="no_drag_app_region " onClick={() => minimizeWindow()}>
                                        Put in system tray
                                    </Button>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>


        </nav>

    )
}

export default Navbar
