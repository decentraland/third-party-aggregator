export type Props = {
  managers: string[]
  error?: string
  onBlur?: () => void
  onChange: (managers: string[]) => void
}
