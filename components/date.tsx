import { FC } from 'react'
import { parseISO, format } from 'date-fns'

interface Props {
  dateString: string
}

export const Date: FC<Props> = (props) => {
  const { dateString } = props
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}
