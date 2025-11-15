'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { useTranslations, useLocale } from 'next-intl'

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
]

export function Footer() {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')
  const locale = useLocale()

  const footerLinks = {
    services: [
      { name: nav('services'), href: `/${locale}/services` },
      { name: nav('projects'), href: `/${locale}/projects` },
      { name: nav('about'), href: `/${locale}/about` },
      { name: nav('contact'), href: `/${locale}/contact` },
    ],
    company: [
      { name: t('links.aboutUs'), href: `/${locale}/about` },
      { name: t('links.ourTeam'), href: `/${locale}/about#team` },
      { name: t('links.careers'), href: `/${locale}/careers` },
      { name: nav('blog'), href: `/${locale}/blog` },
    ],
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.footer
      className="bg-gray-900 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold">Portfolio</span>
            </Link>
            <p className="text-gray-400 text-sm">
              {t('tagline')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">{t('services')}</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">{t('company')}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">{nav('contact')}</h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@portfolio.com"
                className="flex items-center space-x-2 rtl:space-x-reverse text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>hello@portfolio.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center space-x-2 rtl:space-x-reverse text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-start space-x-2 rtl:space-x-reverse text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-1" />
                <span>123 Business Ave<br />New York, NY 10001</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('newsletter.title')}</h3>
              <p className="text-gray-400 text-sm">
                {t('newsletter.description')}
              </p>
            </div>
            <form className="flex space-x-2 rtl:space-x-reverse">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary"
              />
              <Button type="submit" size="sm">
                {t('newsletter.subscribe')}
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          variants={itemVariants}
          className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <p className="text-gray-400 text-sm text-center md:text-left">
            © 2024 Portfolio. {t('copyright')}
          </p>
          <div className="flex space-x-6 rtl:space-x-reverse text-sm">
            <Link href={`/${locale}/privacy`} className="text-gray-400 hover:text-white transition-colors">
              {t('links.privacy')}
            </Link>
            <Link href={`/${locale}/terms`} className="text-gray-400 hover:text-white transition-colors">
              {t('links.terms')}
            </Link>
            <Link href={`/${locale}/cookies`} className="text-gray-400 hover:text-white transition-colors">
              {t('links.cookies')}
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}