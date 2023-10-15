import React from 'react'
import CollectionProvider from "./collectionsContext/context"
import AudioProvider from './audioContext'
import WindowsProvider from './windowsContext'

const Provider = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <WindowsProvider>
      <AudioProvider>
        <CollectionProvider>
          {children}
        </CollectionProvider>
      </AudioProvider>
    </WindowsProvider>
  )
}

export default Provider