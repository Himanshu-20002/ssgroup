import React from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function CTA() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2"></div>
      </div>
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Get Your Free Quote</h2>
          <p className="text-lg text-muted-foreground">
            Ready to create an exhibition stall that sells? Let's talk about your project.
          </p>
        </div>
        <Card className="p-8 sm:p-12 border-border bg-card/50 backdrop-blur-sm rounded-3xl">
          <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input
                  type="text"
                  placeholder="Your name"
                  className="bg-muted/40 border-border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Company</label>
                <Input
                  type="text"
                  placeholder="Your company"
                  className="bg-muted/40 border-border rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input
                type="tel"
                placeholder="Your phone number"
                className="bg-muted/40 border-border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                placeholder="Tell us about your exhibition project"
                rows={4}
                className="w-full bg-muted/40 border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-lg font-semibold"
            >
              Get Free Quote
            </Button>
          </form>
        </Card>
      </div>
    </section>
  )
}
