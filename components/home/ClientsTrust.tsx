import React from 'react'

export function ClientsTrust() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-sm text-muted-foreground mb-12 uppercase tracking-wide">
          Trusted by brands across exhibitions
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-center">
          {['TechCorp', 'Innovation Labs', 'Premium Brands', 'Global Leaders'].map((client) => (
            <div
              key={client}
              className="h-16 rounded-lg bg-muted/40 flex items-center justify-center text-muted-foreground font-semibold text-sm hover:bg-muted/60 transition"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
