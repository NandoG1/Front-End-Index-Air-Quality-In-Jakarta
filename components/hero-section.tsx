import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-100 z-0"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10 z-0"></div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              AI-Powered Weather Prediction for Jakarta
            </h1>
            <p className="text-xl text-gray-600 mb-8 md:pr-12">
              Get accurate weather classifications based on dates or specific parameters using our advanced machine
              learning models.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/predict">
                  Try Prediction Tool <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/Jakarta2.jpg"
                alt="Jakarta Weather AI Dashboard"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg max-w-xs">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <p className="font-medium">Weather Prediction</p>
              </div>
              <p className="text-sm text-gray-500">
                Our AI predicts with 92% accuracy based on historical Jakarta weather data
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
