"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useTranslations } from "next-intl"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  })
  const t = useTranslations("ContactPage");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsSuccess(true)
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-6 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center group">
            <ArrowLeft className="h-5 w-5 mr-3 group-hover:text-[#F5BE2D] transition-colors" />
            <Image
              src="/images/elitereplay-logo.png"
              alt="ÉliteReplay Logo"
              width={150}
              height={75}
              className="group-hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#F5BE2D]">
                {t("title")}
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t("description")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-8">{t("contactInfo.title")}</h2>
              
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#F5BE2D]/20 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-[#F5BE2D]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{t("contactInfo.email")}</h3>
                      <p className="text-gray-400">contact@elitereplay.com</p>
                      <p className="text-gray-400">partnerships@elitereplay.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#F5BE2D]/20 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-[#F5BE2D]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{t("contactInfo.phone")}</h3>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                      <p className="text-gray-400">Mon-Fri, 9AM-6PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#F5BE2D]/20 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-[#F5BE2D]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{t("contactInfo.office")}</h3>
                      <p className="text-gray-400">123 Innovation Drive</p>
                      <p className="text-gray-400">San Francisco, CA 94105</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Partnership Types */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
                <h3 className="text-2xl font-bold mb-6">{t("partnershipOpportunities.title")}</h3>
              
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                    <span className="text-gray-300">{t("partnershipOpportunities.options.list1")}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                    <span className="text-gray-300">{t("partnershipOpportunities.options.list2")}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                    <span className="text-gray-300">{t("partnershipOpportunities.options.list3")}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                    <span className="text-gray-300">{t("partnershipOpportunities.options.list4")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
              {!isSuccess ? (
                <>
                  <h2 className="text-3xl font-bold mb-8">{t("form.title")}</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-lg font-medium mb-2 block">
                          Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-gray-800 border-gray-700 text-white h-12 rounded-xl focus:border-[#F5BE2D] focus:ring-[#F5BE2D]"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-lg font-medium mb-2 block">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-gray-800 border-gray-700 text-white h-12 rounded-xl focus:border-[#F5BE2D] focus:ring-[#F5BE2D]"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company" className="text-lg font-medium mb-2 block">
                        Company/Organization
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 text-white h-12 rounded-xl focus:border-[#F5BE2D] focus:ring-[#F5BE2D]"
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-lg font-medium mb-2 block">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-800 border-gray-700 text-white h-12 rounded-xl focus:border-[#F5BE2D] focus:ring-[#F5BE2D]"
                        placeholder="What can we help you with?"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-lg font-medium mb-2 block">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="bg-gray-800 border-gray-700 text-white rounded-xl focus:border-[#F5BE2D] focus:ring-[#F5BE2D] resize-none"
                        placeholder="Tell us about your project, facility, or partnership interest..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#F5BE2D] hover:bg-[#F5BE2D]/90 text-black font-bold h-14 text-lg rounded-xl shadow-lg shadow-[#F5BE2D]/20 hover:shadow-[#F5BE2D]/40 transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          {t("form.submit")} <Send className="ml-3 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="h-20 w-20 text-[#F5BE2D] mx-auto mb-6" />
                  <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
                  <p className="text-gray-400 text-lg mb-8">
                    {t("form.successMessage")}
                  </p>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    variant="outline"
                    className="border-[#F5BE2D] bg-transparent hover:text-white text-[#F5BE2D] hover:bg-[#F5BE2D]/10 rounded-lg px-8 py-3"
                  >
                    {t("form.reset")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}
