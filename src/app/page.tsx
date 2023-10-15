'use client'

import { useState, useEffect } from 'react';
import { Command, open } from '@tauri-apps/api/shell'
import { useCollectionContext } from '@hooks/collectionContextHook';
import ContentNavbar from '@/components/ContentNavbar';
import Content from '@/components/Content/Content';
import Collection from '@/components/Content/Collection/Collection';
import Navbar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import useWindowsContext from '@/hooks/windowContextHook';
// import { download } from "tauri-plugin-upload-api"
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { invoke } from '@tauri-apps/api/tauri';
import { getData, saveStore, setData, setDefaultData, defaultData } from '@/helper/handleStore';
import { useAudioContext } from "@hooks/audioContextHook"
import { initialStateType } from "@typings/collectionTypes.d"

export default function Page() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [audioDevices, setAudioDevices] = useState<any[]>([]); // [id, name]
  const [isNotInstalledCable, setIsNotInstalledCable] = useState(false);

  const [checking, setChecking] = useState(false);

  const { state: windowState, setRememberSelect, toggleChangeCollection } = useWindowsContext()

  const {
    state: collectionState,
    setAllData
  } = useCollectionContext()

  const { state: audioState, updateDownloadingAudio } = useAudioContext()

  const startPython = async () => {
    setChecking(true)
    const command = Command.sidecar('../bin/testing-ss')
    const output = await command.execute()

    setAudioDevices(JSON.parse(output.stdout))
  }

  useEffect(() => {
    startPython()
  }, [])

  useEffect(() => {
    if (audioDevices.length === 0) {
      setIsNotInstalledCable(false)
      return
    }
    // console.log("audio", audioDevices)
    for (const element of audioDevices) {
      // console.log(element)
      if (element?.deviceName === "CABLE Input (VB-Audio Virtual C") {
        setIsNotInstalledCable(false)
        // console.log("coming here")
        localStorage.setItem("CABLE_NAME", element.deviceName as string)
        localStorage.setItem("CABLE_ID", element.id?.toString() as string)
        setChecking(false)
        break;
      } else {
        setIsNotInstalledCable(true)
        setChecking(false)
      }
    }

  }, [audioDevices])

  useEffect(() => {
    getData("rememberSelect").then((res) => {
      if (res === null) {
        setRememberSelect({
          selected: false,
          selectedType: ""
        })
        return;
      }
      setRememberSelect(res as {
        selected: boolean,
        selectedType: string
      })
    }).catch((err) => {
      console.log("err", err)
      setRememberSelect({
        selected: false,
        selectedType: ""
      })
      return;
    })

    getData("collectionData").then((res) => {
      console.log(res)
      if (res === null) {
        setDefaultData()
        setAllData(defaultData)
        return;
      }
      setAllData(res as initialStateType)
    }).catch((err) => {
      console.log("err", err)
    })

  }, [])

  useEffect(() => {
    if (windowState.changeCollection) {
      setData({ key: "collectionData", value: collectionState })
      saveStore()
      toggleChangeCollection()
    }
  }, [collectionState])

  // const downloadHandler = async () => {
  //   let baseUrl = localStorage.getItem("BASE_DIR");
  //   for (const downloadOption of audioState?.downloadingAudio || []) {
  //     await download(downloadOption.url, `${baseUrl}/audios`, (progress, total) => {
  //       updateDownloadingAudio({
  //         url: downloadOption.url,
  //         progress: `${progress}`,
  //         total: `${total}`
  //       })
  //     })
  //   }
  // }

  useEffect(() => {
    // downloadHandler()
    // let baseUrl = localStorage.getItem("BASE_DIR");
    // console.log(baseUrl)
    console.log(audioState.downloadingAudio)
  }, [audioState.downloadingAudio])

  return (
    <>
      {!isNotInstalledCable && <Dialog defaultOpen={false}>
        <DialogContent removeCloseBtn={true} className='flex flex-col gap-2'>
          <div className='flex gap-1'>
            <span>
              Audio Cable is not installed. Please install it from
            </span>
            <span onClick={() => open("https://vb-audio.com/Cable/")} className='text-blue-500 hover:text-blue-800'>
              HERE
            </span>
          </div>

          <div className='flex gap-4'>
            <Button variant={"ghost"} onClick={() => startPython()} disabled={checking}>
              {checking ? <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking..
              </> : "Check Again"}
            </Button>

            <Button variant="destructive" className="btn btn--primary" onClick={() => invoke("change_app_window", { event: "quit" })}>
              Close Application
            </Button>
          </div>
        </DialogContent>
      </Dialog>}
      <main className='bg-raisinBlackLight flex flex-col justify-start items-center text-white h-full w-full relative overflow-hidden'>
        <Navbar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
        {collectionState?.selectedCollectionName !== "home" && <Sidebar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />}
        <div className={`flex flex-col justify-start items-start w-full ${collectionState?.selectedCollectionName !== "home" && 'sm:w-contentWidth'} h-full flex-nowrap ${collectionState?.selectedCollectionName !== "home" && `sm:ml-[250px]`} transition-[margin] py-5`}>
          <ContentNavbar selectedCollection={collectionState?.selectedCollectionName as string} />
          {collectionState?.selectedCollectionName === "home" ? <Content /> : <Collection />}
        </div>
      </main>
    </>
  )
}
