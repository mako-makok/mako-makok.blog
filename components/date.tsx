import { FC } from 'react'
import { parseISO, format } from 'date-fns'

interface Props {
  date: string
}

export const Date: FC<Props> = (props) => {
  const { date } = props
  return <time dateTime={date}>{format(parseISO(date), 'LLLL d, yyyy')}</time>
}
