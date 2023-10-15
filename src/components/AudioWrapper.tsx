"use client"
import { AudioWrapperType } from '@/typings/globals'


import React from 'react'

const AudioWrapper = ({
    playingAudio,
    setPlayingAudio,
    audioTime,
    setAudioTime,
    removePlayingAudio
}: AudioWrapperType) => {

    const setDurationTimeHandler = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {

        let duration = e.currentTarget.duration
        let hours = `${Math.floor(duration / 3600)}`
        let minutes = `${Math.floor(duration / 60)}`
        let seconds = `${Math.floor(duration - Number(minutes) * 60)}`


        if (Number(seconds) < 10) {
            seconds = `0${seconds}`
        }

        if (Number(minutes) < 10) {
            minutes = `0${minutes}`
        }

        let durationString = `${minutes}:${seconds}`

        if (Number(hours) > 0) {
            if (Number(hours) < 10) {
                hours = `0${hours}`
            }

            durationString = `${hours}:${minutes}:${seconds}`
        }

        setAudioTime({
            ...audioTime,
            duration: durationString,
        })
    }

    const setCurrentTimeHandler = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
        let currentTime = e.currentTarget.currentTime
        let hoursCurrent = `${Math.floor(currentTime / 3600)}`
        let minutesCurrent = `${Math.floor(currentTime / 60)}`
        let secondsCurrent = `${Math.floor(currentTime - Number(minutesCurrent) * 60)}`

        let duration = e.currentTarget.duration
        let hours = `${Math.floor(duration / 3600)}`

        if (Number(secondsCurrent) < 10) {
            secondsCurrent = `0${secondsCurrent}`
        }
        if (Number(minutesCurrent) < 10) {
            minutesCurrent = `0${minutesCurrent}`
        }
        let currentTimeString = `${minutesCurrent}:${secondsCurrent}`

        if (Number(hoursCurrent) < 10) {
            hoursCurrent = `0${hoursCurrent}`
        }

        if (Number(hours) > 0) {
            currentTimeString = `${hoursCurrent}:${minutesCurrent}:${secondsCurrent}`
        }

        setAudioTime({
            ...audioTime,
            currentTime: currentTimeString,
        })

    }

    return (
        <>
            <audio
                key={playingAudio}
                src={playingAudio}
                autoPlay
                hidden

                onLoadedMetadata={(e) => {
                    setDurationTimeHandler(e)
                }}
                onTimeUpdate={(e) => {
                    setCurrentTimeHandler(e)
                }}
                onEnded={() => {
                    setAudioTime({
                        ...audioTime,
                        currentTime: `${(Number(audioTime.duration) / 3600) > 0 ? "00:00:00" : "00:00"}`,
                    })
                    removePlayingAudio()
                }}
            />
        </>
    )
}

export default AudioWrapper;