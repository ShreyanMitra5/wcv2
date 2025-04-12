import { WaitlistForm } from "@/components/waitlist-form"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf2e7] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative plants */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Elegant monstera leaf top right */}
        <svg className="absolute -right-24 -top-24 w-[600px] h-[600px] text-[#847158]/[0.07] animate-float-slower transform rotate-12" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50,20 C60,20 85,25 85,45 C85,65 60,70 50,90 C40,70 15,65 15,45 C15,25 40,20 50,20 Z
                  M50,20 C55,30 75,35 75,50 C75,65 55,70 50,80 C45,70 25,65 25,50 C25,35 45,30 50,20 Z
                  M50,20 C52,35 65,40 65,55 C65,70 52,72 50,75 C48,72 35,70 35,55 C35,40 48,35 50,20 Z" />
        </svg>
        
        {/* Delicate palm frond bottom left */}
        <svg className="absolute -left-16 bottom-0 w-[500px] h-[500px] text-[#847158]/[0.05] animate-float-slow transform -rotate-12" viewBox="0 0 100 100" fill="currentColor">
          <path d="M20,80 Q50,70 80,90 Q50,60 20,80 M25,70 Q50,60 75,80 Q50,50 25,70 M30,60 Q50,50 70,70 Q50,40 30,60
                  M35,50 Q50,40 65,60 Q50,30 35,50 M40,40 Q50,30 60,50 Q50,20 40,40" />
        </svg>
        
        {/* Floating small leaves */}
        <svg className="absolute left-1/4 top-1/3 w-40 h-40 text-[#847158]/[0.06] animate-float" viewBox="0 0 100 100" fill="currentColor">
          <path d="M30,50 C30,30 70,30 70,50 C70,70 30,70 30,50 Z M40,50 C40,35 60,35 60,50 C60,65 40,65 40,50 Z" />
        </svg>
        
        <svg className="absolute right-1/3 bottom-1/4 w-32 h-32 text-[#847158]/[0.08] animate-float-slow" viewBox="0 0 100 100" fill="currentColor">
          <path d="M35,50 C35,35 65,35 65,50 C65,65 35,65 35,50 Z M42,50 C42,40 58,40 58,50 C58,60 42,60 42,50 Z" />
        </svg>
      </div>

      {/* Main content */}
      <div className="max-w-4xl w-full text-center space-y-16 relative z-10">
        <div className="space-y-8">
          <div className="flex items-center justify-center gap-6">
            <Image
              src="/images/light_logo.png"
              alt="Covo Labs"
              width={160}
              height={160}
              className="h-24 w-auto flex-shrink-0"
              priority
            />
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter bg-gradient-to-br from-[#847158] via-[#9c8668] to-[#6a5a46] bg-clip-text text-transparent">
              Covo Labs
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-[#847158]/90 max-w-2xl mx-auto leading-relaxed font-medium">
            Chat together. Build together. Think together. Covo Labs is where conversations become collaboration <span className="font-playfair font-bold italic">— join the waitlist</span>
          </p>
        </div>

        <div className="space-y-8 relative">
          <div className="flex flex-col items-center justify-center gap-4">
            <WaitlistForm />
          </div>
          
          {/* Social proof section */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center justify-center gap-3 relative w-full">
              <div className="flex -space-x-3">
                <div className="relative w-10 h-10 rounded-full border-2 border-[#faf2e7] overflow-hidden">
                  <Image
                    src="/images/e567d1bcdc1fb62b46d61a01359f8bbf.jpg"
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-10 h-10 rounded-full border-2 border-[#faf2e7] overflow-hidden">
                  <Image
                    src="/images/photo-1628875986840-b6f3791d8edc.jpeg"
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-10 h-10 rounded-full border-2 border-[#faf2e7] overflow-hidden">
                  <Image
                    src="/images/image0 (2).jpeg"
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-10 h-10 rounded-full border-2 border-[#faf2e7] overflow-hidden">
                  <Image
                    src="/images/channels4_profile.jpg"
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="relative">
                <p className="text-lg text-[#847158] font-medium">
                  Join <span className="font-bold">15,725+</span> others on the waitlist
                </p>
              </div>
            </div>

            {/* Social media links */}
            <div className="flex items-center gap-8">
              <Link href="https://www.linkedin.com/company/covolabs/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-[#847158] hover:text-[#847158]/80 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
