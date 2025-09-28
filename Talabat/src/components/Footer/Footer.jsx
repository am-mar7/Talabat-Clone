// ./components/Footer/Footer.jsx
import React from 'react';

// Real Talabat links (sources below)
const APP_STORE_LINK = "https://apps.apple.com/us/app/talabat-food-grocery-more/id451001072";
const PLAY_STORE_LINK = "https://play.google.com/store/apps/details?id=com.talabat";
const WEBSITE_LINK = "https://www.talabat.com/";
const SOCIAL = {
  facebook: "https://www.facebook.com/talabat",
  twitter: "https://twitter.com/talabat",
  instagram: "https://www.instagram.com/talabat",
  linkedin: "https://www.linkedin.com/company/talabat-com"
};

export default function Footer() {
  return (
    <footer aria-label="site-footer" className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand / Logo */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <a
                href={WEBSITE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center text-white text-lg font-bold shadow-md"
              >
                T
              </a>
              <div>
                <h3 className="text-xl font-extrabold text-orange-500">Talabat ++</h3>
                <p className="text-sm text-slate-300">Fast. Fresh. Tasty — delivered to your door.</p>
              </div>
            </div>

            <p className="text-sm text-slate-300">
              Built with love — quick MVP for ordering. Want features? Open-source ready.
            </p>

            <div className="flex gap-3 mt-2">
              <a
                href={APP_STORE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
                className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-lg text-slate-700 bg-white hover:shadow-md transition"
              >
                <i className="fab fa-apple text-xl" />
                <span className="text-xs">App Store</span>
              </a>
              <a
                href={PLAY_STORE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
                className="inline-flex items-center gap-2 text-slate-700 px-3 py-1.5 border rounded-lg bg-white hover:shadow-md transition"
              >
                <i className="fab fa-google-play text-xl" />
                <span className="text-xs">Google Play</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-5 grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-300 mb-3">Company</h4>
              <ul className="text-sm text-slate-400 space-y-2">
                <li><a className="hover:text-slate-200 transition-colors" href={WEBSITE_LINK} target="_blank" rel="noopener noreferrer">About us</a></li>
                <li><a className="hover:text-slate-200 transition-colors" href={WEBSITE_LINK} target="_blank" rel="noopener noreferrer">Careers</a></li>
                <li><a className="hover:text-slate-200 transition-colors" href={WEBSITE_LINK} target="_blank" rel="noopener noreferrer">Blog</a></li>
                <li><a className="hover:text-slate-200 transition-colors" href={WEBSITE_LINK} target="_blank" rel="noopener noreferrer">Press</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-300 mb-3">Support</h4>
              <ul className="text-sm text-slate-400 space-y-2">
                <li><a className="hover:text-slate-200 transition-colors" href={WEBSITE_LINK} target="_blank" rel="noopener noreferrer">Help Center</a></li>
                <li><a className="hover:text-slate-200 transition-colors" href={WEBSITE_LINK} target="_blank" rel="noopener noreferrer">Cancellation</a></li>
                <li><a className="hover:text-slate-200 transition-colors" href={WEBSITE_LINK} target="_blank" rel="noopener noreferrer">Delivery</a></li>
                <li><a className="hover:text-slate-200 transition-colors" href={WEBSITE_LINK} target="_blank" rel="noopener noreferrer">Partner with us</a></li>
              </ul>
            </div>
          </div>

          {/* Social column (form removed) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-slate-300">Follow us</h4>

            <div className="pt-1">
              <div className="flex items-center gap-3 text-2xl">
                <a
                  href={SOCIAL.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2 rounded-md hover:bg-orange-50 hover:text-orange-500 transition"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  href={SOCIAL.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="p-2 rounded-md hover:bg-orange-50 hover:text-orange-500 transition"
                >
                  <i className="fab fa-twitter" />
                </a>
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 rounded-md hover:bg-orange-50 hover:text-orange-500 transition"
                >
                  <i className="fab fa-instagram" />
                </a>
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 rounded-md hover:bg-orange-50 hover:text-orange-500 transition"
                >
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </div>

            <div className="mt-auto text-xs text-slate-500">
              <p>Questions? <a className="text-orange-500 hover:underline" href={`${WEBSITE_LINK}contact`} target="_blank" rel="noopener noreferrer">Contact support</a></p>
            </div>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="bg-slate-50 text-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          <div>© {new Date().getFullYear()} Talabat Clone. All rights reserved.</div>
          <div className="flex items-center gap-4 text-xs text-slate-900">
            <a className="hover:underline" href={`${WEBSITE_LINK}privacy`} target="_blank" rel="noopener noreferrer">Privacy</a>
            <span className="hidden sm:inline">•</span>
            <a className="hover:underline" href={`${WEBSITE_LINK}terms`} target="_blank" rel="noopener noreferrer">Terms</a>
            <span className="hidden md:inline">•</span>
            <span>Made with ❤️ in your city</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
