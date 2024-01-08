import { useEffect, useState } from 'react'

type ClockHook = (timeZoneName: string) => [any, any, boolean]

const DEGREE = 6

const useClock: ClockHook = (timeZoneName) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second:'2-digit',
    timeZone: timeZoneName
  };
  const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', options);

  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return new Date(dateTimeFormatter.format(now));
  });
  const [timing, setTiming] = useState({ updateSeconds: {}, updateMinutes: {}, updateHours: {} })
  const [isDaytime, setIsDaytime] = useState(true)

  const updateTime = () => {
    const now = new Date();
    setCurrentTime(new Date(dateTimeFormatter.format(now)));
  }

  useEffect(() => {
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, )

  useEffect(() => {
    const hours = currentTime.getHours()

    const sunriseTime = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      6,
      0,
      0
    )
    const sunsetTime = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      18,
      0,
      0
    )

    setIsDaytime(hours >= sunriseTime.getHours() && hours < sunsetTime.getHours())

    setTiming({
      updateSeconds: { transform: `rotate(${currentTime.getSeconds() * DEGREE}deg)` },
      updateMinutes: { transform: `rotate(${currentTime.getMinutes() * DEGREE}deg)` },
      updateHours: {
        transform: `rotate(${currentTime.getHours() * 30 + currentTime.getMinutes() / 2}deg)`,
      },
    })
  }, [currentTime])

  return [timing, currentTime, isDaytime]
}

export default useClock