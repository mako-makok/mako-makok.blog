import React, { FC } from 'react'
import { parseISO, format } from 'date-fns'

interface Props {
  dateString: string
}

const Date: FC<Props> = (props) => {
  const { dateString } = props
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}

export default Date
