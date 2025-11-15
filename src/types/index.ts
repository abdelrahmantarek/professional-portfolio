export interface Project {
  id: number
  title: string
  description: string
  category: string
  technologies: string[]
  image: string
  link?: string
  github?: string
  featured: boolean
  date: string
  client: string
  duration: string
  teamSize: number
  challenges: string[]
  solutions: string[]
  results: string[]
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string
  features: string[]
  color?: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  image: string
  rating: number
  date: string
}

export interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  image: string
  social: {
    github?: string
    linkedin?: string
    twitter?: string
  }
  skills: string[]
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
  category: string
  tags: string[]
  readTime: number
}