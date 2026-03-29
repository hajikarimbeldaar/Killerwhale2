import { useOnRoadPrice } from '@/hooks/useOnRoadPrice'
import { formatPrice } from '@/utils/priceFormatter'

interface VariantCardProps {
  variant: {
    id: string
    name: string
    price: number
    fuel: string
    transmission: string
    power: string
    features: string
  }
  onClick: () => void
  onGetPrice: (e: React.MouseEvent) => void
  onGetBestDeal: (e: React.MouseEvent) => void
}

export default function VariantCard({ variant, onClick, onGetPrice, onGetBestDeal }: VariantCardProps) {
  // Get on-road price
  const { onRoadPrice, isOnRoadMode, city } = useOnRoadPrice({
    exShowroomPrice: variant.price * 100000, // Convert lakhs to rupees
    fuelType: variant.fuel
  })

  const displayPrice = isOnRoadMode ? (onRoadPrice / 100000) : variant.price
  const priceLabel = isOnRoadMode ? 'On-Road Price' : 'Ex-Showroom Price'

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0 pr-3">
          <h4 className="text-base sm:text-lg font-bold text-red-600 mb-1 truncate" title={variant.name}>{variant.name}</h4>
          <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-600">
            <span>{variant.fuel}</span>
            <span>{variant.transmission}</span>
            <span className="truncate">{variant.power.split('@')[0].trim()}</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-[10px] sm:text-xs text-gray-500">{priceLabel}</p>
          <p className="text-lg sm:text-xl font-bold text-gray-900">{formatPrice(displayPrice)}</p>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2">Key Features:</p>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 overflow-hidden">
          {variant.features}
        </p>
      </div>

      <div className="flex flex-col space-y-2 mt-auto">
        <div className="text-[10px] sm:text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 sm:py-1 rounded inline-block w-fit">
          Save up to ₹{Math.min(variant.price * 100000 * 0.05, 50000).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
        </div>
        <div className="flex space-x-2 sm:space-x-3 pt-1">
          <button
            className="flex-1 border-2 border-gray-200 text-gray-700 hover:border-red-200 hover:bg-red-50 hover:text-red-700 px-2 sm:px-4 py-2 sm:py-2.5 rounded text-xs sm:text-sm font-bold transition-all whitespace-nowrap"
            onClick={onGetPrice}
          >
            Get On-Road Price
          </button>
          <button
            className="flex-1 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-2 sm:px-4 py-2 sm:py-2.5 rounded shadow shadow-red-500/20 text-xs sm:text-sm font-bold transition-all whitespace-nowrap"
            onClick={onGetBestDeal}
          >
            Get Best Deal
          </button>
        </div>
      </div>
    </div>
  )
}
