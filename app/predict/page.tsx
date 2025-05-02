"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  CalendarIcon,
  Loader2,
  CloudRain,
  CloudSun,
  Cloud,
  CloudLightning,
  CheckCircle,
  AlertTriangle,
  XCircle,
  AlertCircle,
  ShieldCheck,
  Info,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ParameterSlider from "@/components/parameter-slider"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function PredictPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [parameters, setParameters] = useState({
    pm10: 50,
    co: 1.5,
    so2: 20,
    no2: 25,
    o3: 35,
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("date")
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  const API_BASE_URL = "http://localhost:5000/api"

  useEffect(() => {
    setIsPageLoaded(true)
  }, [])

  useEffect(() => {
    setResult(null)
  }, [activeTab])

  const handleParameterChange = (name: string, value: number) => {
    setParameters((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) return

    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const formattedDate = format(date, 'yyyy-MM-dd')
      
      const response = await fetch(`${API_BASE_URL}/predict/date`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: formattedDate }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get prediction')
      }

      const data = await response.json()
      setResult(data)
    } catch (err: any) {
      console.error('Error fetching prediction:', err)
      setError(err.message || 'Failed to get prediction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleParametersSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const requestData = {
        pm10: parameters.pm10,
        co: parameters.co,
        so2: parameters.so2,
        no2: parameters.no2,
        o3: parameters.o3,
      }
      
      const response = await fetch(`${API_BASE_URL}/predict/weather`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get prediction')
      }

      const data = await response.json()
      setResult(data)
    } catch (err: any) {
      console.error('Error fetching prediction:', err)
      setError(err.message || 'Failed to get prediction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getWeatherIcon = () => {
    if (!result || !result.category) return <Cloud className="h-16 w-16 text-white" />
    
    const category = result.category.toLowerCase()
    if (category.includes("baik")) return <CloudSun className="h-16 w-16 text-green-500" />
    if (category.includes("tidak sehat")) return <CloudRain className="h-16 w-16 text-red-500" />
    if (category.includes("sedang")) return <Cloud className="h-16 w-16 text-yellow-500" />
    if (category.includes("sangat tidak sehat")) return <CloudLightning className="h-16 w-16 text-purple-500" />
    return <Cloud className="h-16 w-16 text-white" />
  }

  const getAirQualityIcon = () => {
    if (!result || !result.category) return <CheckCircle className="h-16 w-16 text-white" />
    
    const category = result.category.toLowerCase()
    if (category.includes("baik")) return <CheckCircle className="h-16 w-16 text-green-500" />
    if (category.includes("sedang")) return <AlertTriangle className="h-16 w-16 text-yellow-500" />
    if (category.includes("tidak sehat")) return <XCircle className="h-16 w-16 text-orange-500" />
    if (category.includes("sangat tidak sehat")) return <AlertCircle className="h-16 w-16 text-red-500" />
    return <CheckCircle className="h-16 w-16 text-white" />
  }

  const getIcon = () => {
    if (activeTab === "date") return getWeatherIcon()
    return getAirQualityIcon()
  }

  const getTitle = () => {
    if (activeTab === "date") return "Weather Prediction"
    return "Air Quality Classification"
  }

  const getDescription = () => {
    if (activeTab === "date") {
      return "Based on historical data and our AI model, the predicted weather condition is:"
    }
    return "Based on the parameters you provided, our AI model classifies the air quality as:"
  }

  const getRecommendation = () => {
    if (!result || !result.category) return null;
    
    const category = result.category.toLowerCase();
    
    if (category.includes("baik")) {
      return {
        title: "Good Air Quality",
        description: "The air quality is considered satisfactory, and air pollution poses little or no risk. You can enjoy outdoor activities without concern for air quality impacts.",
        actions: [
          "Continue regular outdoor activities",
          "Keep windows open for fresh air",
          "Ideal time for outdoor exercise"
        ],
        color: "text-green-400",
        iconColor: "bg-green-500/20"
      };
    } else if (category.includes("sedang")) {
      return {
        title: "Moderate Air Quality",
        description: "Air quality is acceptable; however, there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
        actions: [
          "Sensitive individuals should consider reducing prolonged outdoor exertion",
          "Keep windows closed if you have respiratory conditions",
          "Monitor air quality changes"
        ],
        color: "text-yellow-400",
        iconColor: "bg-yellow-500/20"
      };
    } else if (category.includes("sangat tidak sehat")) {
      return {
        title: "Very Unhealthy Air Quality",
        description: "Health warnings of emergency conditions. The entire population is more likely to be affected.",
        actions: [
          "Avoid all outdoor physical activity",
          "Stay indoors and keep windows closed",
          "Use air purifiers if available",
          "Wear masks if you must go outside",
          "Follow local health authority recommendations"
        ],
        color: "text-red-400",
        iconColor: "bg-red-500/20"
      };
    }
    else if (category.includes("tidak sehat")) {
      return {
        title: "Unhealthy Air Quality",
        description: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.",
        actions: [
          "Reduce prolonged or heavy outdoor exertion",
          "Take more breaks during outdoor activities",
          "Consider rescheduling strenuous outdoor activities",
          "People with respiratory or heart disease should stay indoors"
        ],
        color: "text-orange-400",
        iconColor: "bg-orange-500/20"
      };
    }
    
    return null;
  }

  const getBgGradient = () => {
    if (!result || !result.category) return "from-blue-900/20 to-black"
    
    const category = result.category.toLowerCase()
    
    if (activeTab === "date") {
      if (category.includes("baik")) return "from-green-900/20 to-black" 
      if (category.includes("sedang")) return "from-yellow-900/30 to-black"
      if (category.includes("tidak sehat")) return "from-red-800/30 to-black"
      if (category.includes("sangat tidak sehat")) return "from-red-900/40 to-black"
      return "from-blue-900/20 to-black"
    } else {
      if (category.includes("baik")) return "from-green-900/20 to-black"
      if (category.includes("sedang")) return "from-yellow-900/20 to-black"
      if (category.includes("tidak sehat")) return "from-orange-900/20 to-black"
      if (category.includes("sangat tidak sehat")) return "from-red-900/20 to-black"
      return "from-blue-900/20 to-black"
    }
  }

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
  }

  const formVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  }

  const resultVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  const recommendationVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
  }

  const getResultText = () => {
    if (!result) return ""
    return result.category || "Unknown"
  }

  const recommendation = result ? getRecommendation() : null;

  return (
    <motion.div
      initial="initial"
      animate={isPageLoaded ? "animate" : "initial"}
      variants={pageVariants}
      className="flex min-h-screen flex-col"
    >
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center reveal">
            <h1 className="text-4xl font-bold mb-4 text-gradient">Jakarta Weather Prediction</h1>
            <p className="text-gray-300 md:w-2/3 mx-auto">
              Use our AI-powered tool to predict weather conditions in Jakarta. Choose between date-based prediction or
              parameter-based classification.
            </p>
          </div>

          <motion.div variants={formVariants} className="max-w-3xl mx-auto reveal">
            <Tabs defaultValue="date" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-900 p-1">
                <TabsTrigger
                  value="date"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
                >
                  Date-Based Prediction
                </TabsTrigger>
                <TabsTrigger
                  value="parameters"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
                >
                  Parameter-Based Prediction
                </TabsTrigger>
              </TabsList>

              <TabsContent value="date" className="animate-fade-in">
                <Card className="glass-effect border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Predict Weather by Date</CardTitle>
                    <CardDescription className="text-gray-300">
                      Select a date to get a weather classification prediction for Jakarta.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleDateSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="date" className="text-white">
                          Select Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal border-white/20 bg-black hover:bg-white/10 transition-all duration-300",
                                !date && "text-gray-400",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Select a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-black border-white/20">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                              className="bg-black text-white"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
                        disabled={!date || loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Get Prediction"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="parameters" className="animate-fade-in">
                <Card className="glass-effect border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Air Quality Parameter Input</CardTitle>
                    <CardDescription className="text-gray-300">
                      Adjust the sliders to set air quality parameters and get a pollution classification prediction for Jakarta.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleParametersSubmit} className="space-y-8">
                      <div className="space-y-6">
                        <ParameterSlider
                          name="pm10"
                          label="PM10"
                          unit="μg/m³"
                          min={0}
                          max={300}
                          step={1}
                          defaultValue={parameters.pm10}
                          onChange={(value) => handleParameterChange("pm10", value)}
                          description="Particulate matter 10 micrometers or less in diameter"
                        />

                        <ParameterSlider
                          name="co"
                          label="CO"
                          unit="ppm"
                          min={0}
                          max={300}
                          step={1}
                          defaultValue={parameters.co}
                          onChange={(value) => handleParameterChange("co", value)}
                          description="Carbon monoxide concentration in parts per million"
                        />

                        <ParameterSlider
                          name="so2"
                          label="SO2"
                          unit="ppb"
                          min={0}
                          max={300}
                          step={1}
                          defaultValue={parameters.so2}
                          onChange={(value) => handleParameterChange("so2", value)}
                          description="Sulfur dioxide concentration in parts per billion"
                        />

                        <ParameterSlider
                          name="no2"
                          label="NO2"
                          unit="ppb"
                          min={0}
                          max={300}
                          step={1}
                          defaultValue={parameters.no2}
                          onChange={(value) => handleParameterChange("no2", value)}
                          description="Nitrogen dioxide concentration in parts per billion"
                        />

                        <ParameterSlider
                          name="o3"
                          label="O3"
                          unit="ppb"
                          min={0}
                          max={300}
                          step={1}
                          defaultValue={parameters.o3}
                          onChange={(value) => handleParameterChange("o3", value)}
                          description="Ozone concentration in parts per billion"
                        />
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            "Get Prediction"
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {result && (
              <motion.div initial="initial" animate="animate" variants={resultVariants} className="mt-8">
                <Card
                  className={`bg-gradient-to-br ${getBgGradient()} border-blue-500/20 shadow-lg animate-blue-pulse`}
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="relative animate-float">
                      {getIcon()}
                      <div className="absolute inset-0 blur-md bg-white opacity-20 rounded-full"></div>
                    </div>
                    <div>
                      <CardTitle className="text-white">{getTitle()}</CardTitle>
                      <p className="text-sm text-gray-300">{getDescription()}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6">
                      <h3 className="text-3xl font-bold mb-4 text-white">{getResultText()}</h3>
                      <p className="text-gray-300 mb-4">
                        {activeTab === "date"
                          ? "This prediction is based on historical weather patterns in Jakarta."
                          : "This classification is based on the environmental parameters you provided."}
                      </p>
                      
                      {activeTab === "parameters" && result.critical_parameters && (
                        <div className="mt-4 p-4 bg-black/30 rounded-lg">
                          <p className="text-yellow-400 font-medium mb-2">Critical Parameters:</p>
                          <p className="text-white">{result.critical_parameters.join(", ")}</p>
                          <p className="text-sm text-gray-300 mt-2">Max Value: {result.max_value}</p>
                        </div>
                      )}
                      
                      {error && (
                        <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                          <p className="text-red-400">{error}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {result && recommendation && (
              <motion.div initial="initial" animate="animate" variants={recommendationVariants} className="mt-6">
                <Card className="glass-effect border-white/10">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className={`p-2 rounded-full ${recommendation.iconColor}`}>
                      <ShieldCheck className={`h-8 w-8 ${recommendation.color}`} />
                    </div>
                    <div>
                      <CardTitle className={`${recommendation.color}`}>{recommendation.title}</CardTitle>
                      <CardDescription className="text-gray-300">Recommendations based on current conditions</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <p className="text-gray-200">{recommendation.description}</p>
                      
                      <div className="mt-4">
                        <h4 className="text-white font-medium mb-3 flex items-center">
                          <Info className="h-4 w-4 mr-2 text-blue-400" />
                          Recommended Actions:
                        </h4>
                        <ul className="space-y-2">
                          {recommendation.actions.map((action, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-300">
                              <div className="min-w-4 mt-1">
                                <div className={`h-2 w-2 rounded-full ${recommendation.color}`}></div>
                              </div>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-4 p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg">
                        <p className="text-blue-300 text-sm">
                          <strong>Note:</strong> These recommendations are general guidelines. Please follow official guidance from local authorities during severe air quality events.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  )
}