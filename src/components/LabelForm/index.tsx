import React from 'react'

interface LabelFormProps {
  children: string | string[] | null | React.ReactElement
}

const LabelForm = ({children}: LabelFormProps) => {
  return (
    <p className="text-base">{children}</p>
  )
}

export default LabelForm