// components/SocialMediaLinks.tsx
import { FaFacebook, FaTelegram, FaTwitter, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { FC } from 'react';

// Define types for social links and official contacts
interface LinkItem {
  name: string;
  icon: IconType; // Type for a React Icon component
  href: string;
}

interface ContactItem extends LinkItem {
  detail: string;
}

// --- IMPORTANT: Replace these with the actual Woreda 3 links and contact info! ---
const socialLinks: LinkItem[] = [
  { name: 'Official Facebook', icon: FaFacebook, href: 'https://facebook.com/woreda3pp' },
  { name: 'Official Telegram Channel', icon: FaTelegram, href: 'https://t.me/woreda3pp' },
  { name: 'Official X (Twitter)', icon: FaTwitter, href: 'https://twitter.com/woreda3pp' },
];

const officialContacts: ContactItem[] = [
  { name: 'Woreda Office Phone', icon: FaPhone, detail: '+251 11 XXX XXXX', href: 'tel:+25111XXXXXXX' },
  { name: 'Email Address', icon: FaMapMarkerAlt, detail: 'woreda3.pp@eth.gov', href: 'mailto:woreda3.pp@eth.gov' },
  { name: 'Physical Address', icon: FaMapMarkerAlt, detail: 'Woreda 3 Admin Building, 1st Floor', href: '#' },
];

const SocialMediaLinks: FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Social Media</h3>
        <ul className="space-y-3">
          {socialLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 transition duration-150"
              >
                <link.icon className="h-5 w-5" />
                <span>{link.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Contact Officials</h3>
        <ul className="space-y-3">
          {officialContacts.map((contact) => (
            <li key={contact.name} className="flex items-start space-x-3">
              <contact.icon className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-gray-900">{contact.name}</p>
                <a href={contact.href} className="text-gray-600 hover:underline">{contact.detail}</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SocialMediaLinks;