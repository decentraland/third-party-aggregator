import React, { useState } from 'react'
import { TagField } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { isAddress } from '../../modules/thirdParty/utils'
import { Props } from './ManagersField.types'
import './ManagersField.css'

const ManagersField = ({ managers, error: providedError, onChange, onBlur }: Props) => {
  const [error, setError] = useState('')

  return (
    <div className="ManagersField">
      <TagField
        label={t('managers_field.label')}
        value={managers}
        onBlur={onBlur}
        onChange={(_, props) => {
          const values = props.value as string[]
          if (values.length > 0) {
            const last = values[values.length - 1]
            if (!isAddress(last)) {
              setError(t('managers_field.required_valid_address'))
            } else {
              onChange(values)
              setError('')
            }
          } else {
            onChange(values)
          }
        }}
        message={[providedError, error].filter(e => !!e).join(' - ')}
        error={!!providedError}
      />
    </div>
  )
}

export default React.memo(ManagersField)
