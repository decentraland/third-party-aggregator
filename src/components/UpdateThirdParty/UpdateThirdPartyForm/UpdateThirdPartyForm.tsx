import React, { useMemo } from 'react'
import { Button, Field, Header } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Controller, useForm } from 'react-hook-form'
import { UpdateThirdPartyFormData, Props } from './UpdateThirdPartyForm.types'
import './UpdateThirdPartyForm.css'
import ManagersField from '../../ManagersField'
import { ContractsTable } from '../../ContractsTable'
import { ContractsField } from '../../ContractsField'
import { LinkedContract, ThirdPartyVersion } from '../../../modules/thirdParty/types'
import { getThirdPartyVersion } from '../../../modules/thirdParty/utils'

const UpdateThirdPartyForm = ({ thirdParty, canUpdate, isUpdating, onUpdateThirdParty }: Props) => {
  const thirdPartyVersion = useMemo(() => getThirdPartyVersion(thirdParty), [thirdParty])
  const { control, handleSubmit } = useForm<UpdateThirdPartyFormData>({
    disabled: isUpdating || !canUpdate,
    defaultValues: {
      name: thirdParty?.metadata.name ?? '',
      description: thirdParty?.metadata.description ?? '',
      contracts: thirdParty?.metadata.contracts ?? [],
      resolver: thirdParty?.resolver ?? '',
      slots: '0',
      managers: thirdParty?.managers ?? []
    }
  })

  return (
    <form className="UpdateThirdPartyForm" onSubmit={handleSubmit(data => onUpdateThirdParty(data))}>
      <Controller
        name="name"
        rules={{
          required: {
            value: true,
            message: t('update_third_party.required')
          },
          validate: (value: string) => {
            if (value.includes(':')) {
              return t('update_third_party.required_no_colon_allowed')
            }
          }
        }}
        control={control}
        render={({ field, fieldState }) => (
          <Field
            label={t('update_third_party.name')}
            {...field}
            message={fieldState.error?.message || thirdParty.id}
            error={fieldState.invalid}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        rules={{
          required: {
            value: true,
            message: t('update_third_party.required')
          },
          validate: (value: string) => {
            if (value.includes(':')) {
              return t('update_third_party.required_no_colon_allowed')
            }
          }
        }}
        render={({ field, fieldState }) => (
          <Field label={t('update_third_party.description')} {...field} message={fieldState.error?.message} error={fieldState.invalid} />
        )}
      />
      {thirdPartyVersion === ThirdPartyVersion.V2 && (
        <Controller
          name="contracts"
          control={control}
          render={({ field }) => (
            <>
              <Header sub>{t('update_third_party.contracts')}</Header>
              <ContractsTable contracts={field.value} />
              <ContractsField
                disabled={field.disabled}
                onChange={(contract: LinkedContract) => field.onChange(field.value.concat(contract))}
              />
            </>
          )}
        />
      )}
      {thirdPartyVersion === ThirdPartyVersion.V1 && (
        <Controller
          name="resolver"
          control={control}
          rules={{
            validate: (value: string) => {
              if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/.test(value)) {
                return t('update_third_party.required_valid_url')
              }
            }
          }}
          render={({ field, fieldState }) => (
            <Field label={t('update_third_party.resolver')} {...field} message={fieldState.error?.message} error={fieldState.invalid} />
          )}
        />
      )}
      <Controller
        name="slots"
        control={control}
        rules={{
          required: {
            value: true,
            message: t('update_third_party.required')
          },
          min: {
            value: 0,
            message: t('update_third_party.required_positive')
          }
        }}
        render={({ field, fieldState }) => (
          <Field
            label={t('update_third_party.slots')}
            type="number"
            {...field}
            message={
              fieldState.error?.message ||
              t(`update_third_party.available_slots`, {
                v: Number(thirdParty.maxItems) - Number(thirdParty.consumedSlots)
              })
            }
            error={fieldState.invalid}
          />
        )}
      />
      <Controller
        name="managers"
        control={control}
        rules={{
          validate: managers => {
            if (managers.length === 0) {
              return t('update_third_party.required_manager')
            }
          }
        }}
        render={({ field, fieldState }) => (
          <ManagersField
            managers={field.value}
            error={fieldState.error?.message}
            onChange={managers => field.onChange({ target: { value: managers } })}
          />
        )}
      />
      {canUpdate && (
        <div>
          <Button type="submit" primary disabled={isUpdating} loading={isUpdating}>
            {t('update_third_party.submit')}
          </Button>
        </div>
      )}
    </form>
  )
}
export default React.memo(UpdateThirdPartyForm)
