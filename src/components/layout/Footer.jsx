import { FaceBookIcon } from "@/icons/FaceBookIcon";
import { InstaIcon } from "@/icons/InstaIcon";
import { LocationIcon } from "@/icons/LocationIcon";
import { MailIcon } from "@/icons/MailIcon";
import { PhoneIcon } from "@/icons/PhoneIcon";
import { TwitterIcon } from "@/icons/TwitterIcon";
import Link from "next/link";
const FOOTER_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Categories', href: '/#categories' },
    { label: 'Offers', href: '/#offers' },
    { label: 'Services', href: '/#services' },
    { label: 'Reviews', href: '/#reviews' },
    { label: 'Contact', href: '/#contact' },
];
const Footer = () => {
    return (<footer className="bg-gray-950 border-t border-gray-800 mt-8">
      <div className="container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <Link href="/" className='text-primary text-2xl font-josefin font-bold'>Pizza Fiesta</Link>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Passionate about delivering unforgettable food experiences with every order we serve.
            </p>
            <div className="mt-6 flex gap-4">
              <Link href="https://twitter.com" aria-label="Twitter">
                <TwitterIcon className="w-5 hover:text-primary transition-colors"/>
              </Link>
              <Link href="https://facebook.com" aria-label="Facebook">
                <FaceBookIcon className="w-5 hover:text-primary transition-colors"/>
              </Link>
              <Link href="https://instagram.com" aria-label="Instagram">
                <InstaIcon className="w-5 hover:text-primary transition-colors"/>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="uppercase text-white font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map(link => (<li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>))}
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-white font-semibold mb-5">Opening Hours</h4>
            <p className="text-gray-400 text-sm">Monday – Friday</p>
            <p className="text-primary font-medium mt-1">8:00 AM – 9:00 PM</p>
            <p className="text-gray-400 text-sm mt-4">Saturday – Sunday</p>
            <p className="text-primary font-medium mt-1">10:00 AM – 10:00 PM</p>
          </div>

          <div>
            <h4 className="uppercase text-white font-semibold mb-5">Contact Us</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex gap-3 items-start">
                <LocationIcon className="w-5 shrink-0 mt-0.5"/>
                <span>20 Graham Rd, Malvern WR14 2HL, United Kingdom</span>
              </li>
              <li className="flex gap-3 items-center">
                <PhoneIcon className="w-5 shrink-0"/>
                <span>+44 168 4892 229</span>
              </li>
              <li className="flex gap-3 items-center">
                <MailIcon className="w-5 shrink-0"/>
                <span>info@pizzafiesta.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            Copyright &copy; {new Date().getFullYear()} Pizza Fiesta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>);
};
export default Footer;
