import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Cloud,
  CloudRain,
  CloudSun,
  CloudLightning,
  CheckCircle,
  AlertTriangle,
  XCircle,
  AlertCircle,
} from "lucide-react"

interface PredictionResultProps {
  result: string
  type: string
}

export default function PredictionResult({ result, type }: PredictionResultProps) {
  const getWeatherIcon = () => {
    if (result.toLowerCase().includes("sunny")) return <CloudSun className="h-12 w-12 text-yellow-500" />
    if (result.toLowerCase().includes("rainy")) return <CloudRain className="h-12 w-12 text-blue-500" />
    if (result.toLowerCase().includes("cloudy")) return <Cloud className="h-12 w-12 text-gray-500" />
    if (result.toLowerCase().includes("storm")) return <CloudLightning className="h-12 w-12 text-purple-500" />
    return <Cloud className="h-12 w-12 text-emerald-500" />
  }

  const getAirQualityIcon = () => {
    if (result.toLowerCase().includes("good")) return <CheckCircle className="h-12 w-12 text-green-500" />
    if (result.toLowerCase().includes("moderate")) return <AlertTriangle className="h-12 w-12 text-yellow-500" />
    if (result.toLowerCase().includes("poor")) return <XCircle className="h-12 w-12 text-orange-500" />
    if (result.toLowerCase().includes("hazardous")) return <AlertCircle className="h-12 w-12 text-red-500" />
    return <CheckCircle className="h-12 w-12 text-emerald-500" />
  }

  const getIcon = () => {
    if (type === "date") return getWeatherIcon()
    return getAirQualityIcon()
  }

  const getTitle = () => {
    if (type === "date") return "Weather Prediction"
    return "Air Quality Classification"
  }

  const getDescription = () => {
    if (type === "date") {
      return "Based on historical data and our AI model, the predicted weather condition is:"
    }
    return "Based on the parameters you provided, our AI model classifies the air quality as:"
  }

  const getBgColor = () => {
    if (type === "date") {
      if (result.toLowerCase().includes("sunny")) return "bg-yellow-50"
      if (result.toLowerCase().includes("rainy")) return "bg-blue-50"
      if (result.toLowerCase().includes("cloudy")) return "bg-gray-50"
      if (result.toLowerCase().includes("storm")) return "bg-purple-50"
      return "bg-emerald-50"
    } else {
      if (result.toLowerCase().includes("good")) return "bg-green-50"
      if (result.toLowerCase().includes("moderate")) return "bg-yellow-50"
      if (result.toLowerCase().includes("poor")) return "bg-orange-50"
      if (result.toLowerCase().includes("hazardous")) return "bg-red-50"
      return "bg-emerald-50"
    }
  }

  return (
    <Card className={`${getBgColor()} border-none shadow-lg`}>
      <CardHeader className="flex flex-row items-center gap-4">
        {getIcon()}
        <div>
          <CardTitle>{getTitle()}</CardTitle>
          <p className="text-sm text-gray-500">{getDescription()}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-6">
          <h3 className="text-3xl font-bold mb-4">{result}</h3>
          <p className="text-gray-500">
            {type === "date"
              ? "This prediction is based on historical weather patterns in Jakarta."
              : "This classification is based on the environmental parameters you provided."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
