"use client"

import React, { ReactElement, useEffect } from 'react'
import Providers from "@features/Provider"
// import downloadFile from '@helper/downloadFile'
import { BaseDirectory, exists, createDir } from "@tauri-apps/api/fs"
// import { appDataDir } from "@tauri-apps/api/path"
interface MainLayoutProps {
    children: ReactElement | ReactElement[] | React.ReactNode | undefined
}

const MainLayout = ({
    children
}: MainLayoutProps) => {


    useEffect(() => {
        // localStorage.setItem("BASE_DIR", `${appDataDir}`)
        const isExist = async () => {
            const exist = await exists("audios", {
                dir: BaseDirectory.AppData
            })
            if (!exist) {
                console.log("not exist")
                await createDir("audios", {
                    dir: BaseDirectory.AppData
                })
            }
            console.log("exist", exist)
        }
        isExist()
    }, [])


    return (
        <>
            <Providers>
                {children}
            </Providers>
        </>
    )
}

export default MainLayout
