import { coordinates } from '@/assets/coordinates';
import { PrayTimes } from '@/utilities';
import { dayOfYearToDate } from '@/utilities/dayOfYearToDate';
import { generateDates } from '@/utilities/server'
import { getUtcOffset } from '@/utilities/getUtcOffset';

export type PrayerReturnProps = {
  prayers: string[],
  city: number,
  cityName: string,
  dd: number,
  m: number,
  d: number
}

type GetNamazServiceProps = {
  city: number;
  dayOfYear: number;
}

export const getNamazService = async ({ city, dayOfYear }: GetNamazServiceProps) => {

  const year = new Date().getFullYear()

  const calculatedDate = dayOfYearToDate(dayOfYear, year)
  const month = calculatedDate.getMonth() + 1
  const day = calculatedDate.getDate()

  const cityData = coordinates.find(c => c.id === city)
  if (!cityData) {
    throw new Error('city not found')
  }

  const tzDate = getUtcOffset(cityData.lat, cityData.lng) / 60

  const calculatedPrayerTimes = PrayTimes();
  const prayerTimes = calculatedPrayerTimes.getTimes(calculatedDate, [cityData.lat, cityData.lng], tzDate, 0);

  console.log({ prayerTimes })

  if (!prayerTimes) {
    throw new Error('Prayer times not found')
  }

  const result = {
    prayers: [
      prayerTimes.fajr,
      prayerTimes.sunrise,
      prayerTimes.dhuhr,
      prayerTimes.asr,
      prayerTimes.maghrib,
      prayerTimes.isha,
    ],
    city: cityData.id,
    cityName: cityData.city,
    dd: dayOfYear,
    m: month,
    d: day,
  }

  const twoDates = generateDates({ m: month, d: day })

  return { ...result, ...twoDates }
}