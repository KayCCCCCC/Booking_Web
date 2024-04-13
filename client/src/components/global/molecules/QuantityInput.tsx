import { Minus, Plus } from "lucide-react"

interface QuantityInputProps {
  fieldName: string
  description: string
  value: number
  onChange: (input: number) => void
}
const QuantityInput = ({ fieldName, description, value, onChange }: QuantityInputProps) => {
  const handleIncrement = () => {
    onChange(value + 1)
  }

  const handleDecrement = () => {
    if (value > 0) {
      onChange(value - 1)
    }
  }

  return (
    <div className="flex items-center gap-2 ">
      <div className="flex w-40 flex-col">
        <div className="">{fieldName}</div>
        <div className="text-sm text-slate-700">{description}</div>
      </div>
      <button
        type="button"
        onClick={handleDecrement}
        className="flex  items-center justify-center rounded-sm border border-slate-100 p-2 hover:bg-red-400"
      >
        <Minus size={12} />
      </button>
      <div className="px-2">{value}</div>
      <button
        type="button"
        onClick={handleIncrement}
        className="flex items-center justify-center rounded-sm border border-slate-100 p-2 hover:bg-red-400"
      >
        <Plus size={12} />
      </button>
    </div>
  )
}

export default QuantityInput
