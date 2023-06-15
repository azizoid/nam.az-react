import { NextResponse } from 'next/server'

import { getDayOfYear } from 'date-fns'
import Joi from 'joi'

import { cityRule } from '@/assets/joiValidationRules'
import { getNamazService } from '@/lib/getNamazService'
import { leapYearOffset } from '@/utilities/server'

const schema = Joi.object({
  city: cityRule,
})

type ParamsType = { params: { city: string } }

export const GET = async (_: Request, { params }: ParamsType) => {
  try {
    const { city } = params

    const { value: validationValue, error: validationError } = schema.validate({ city })
    if (validationError) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 })

    }

    const dayOfYear = getDayOfYear(new Date())
    const tempLeapYearAdjustment = leapYearOffset(dayOfYear)
    const dd = tempLeapYearAdjustment + dayOfYear // TODO: rename to `dayOfYearWithLeapYearAdjustment`

    const prayerTimes = await getNamazService({ city: validationValue.city, dd })

    return NextResponse.json(prayerTimes, { status: 200 })

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}