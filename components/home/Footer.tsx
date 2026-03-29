import React from 'react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white">SS</span>
              </div>
              <span className="font-bold text-lg">SS Group</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Premium exhibition stall fabrication and design services.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition">Stall Fabrication</a></li>
              <li><a href="#" className="hover:text-foreground transition">Booth Design</a></li>
              <li><a href="#" className="hover:text-foreground transition">Installation</a></li>
              <li><a href="#" className="hover:text-foreground transition">On-site Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📍 123 Exhibition Way, City Center</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>✉️ hello@ssgroup.com</p>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; 2024 SS Group. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-foreground transition">Privacy</a>
            <a href="#" className="hover:text-foreground transition">Terms</a>
            <a href="#" className="hover:text-foreground transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
