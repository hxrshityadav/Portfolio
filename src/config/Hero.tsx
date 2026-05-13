/*
 * CUSTOMIZATION EXAMPLE
 *
 * Want to customize this portfolio for yourself? Here's how easy it is:
 *
 * 1. Update your personal info:
 *    name: "Your Name"
 *    title: "Your Professional Title"
 *    avatar: "/path/to/your/image.jpg"
 *
 * 2. Add your skills:
 *    skills: [
 *      { name: "Python", href: "https://python.org", component: "Python" }, // Note: You'd need to create Python component
 *      { name: "React", href: "https://react.dev", component: "ReactIcon" },
 *      { name: "Node.js", href: "https://nodejs.org", component: "NodeJs" },
 *    ]
 *
 * 3. Write your description using the template:
 *    template: "I'm a **passionate developer** who loves building apps with {skills:0} and {skills:1}. I specialize in **web development** and enjoy working with {skills:2}."
 *
 * 4. Update your social links:
 *    Just change the href values to your own social media profiles
 *
 * That's it! Your portfolio will automatically update with your information.
 */
import Github from '@/components/svgs/Github';
import Instagram from '@/components/svgs/Instagram';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';
import Medium from '@/components/svgs/Medium';
import X from '@/components/svgs/X';
import Firebase from '@/components/technologies/Firebase';
import Java from '@/components/technologies/Java';
import JavaScript from '@/components/technologies/JavaScript';
import NextJs from '@/components/technologies/NextJs';
import ReactIcon from '@/components/technologies/ReactIcon';
import SpringBoot from '@/components/technologies/SpringBoot';
// Technology Components
import TypeScript from '@/components/technologies/TypeScript';

// Component mapping for skills
export const skillComponents = {
  Java: Java,
  SpringBoot: SpringBoot,
  Firebase: Firebase,
  TypeScript: TypeScript,
  ReactIcon: ReactIcon,
  NextJs: NextJs,
  JavaScript: JavaScript,
};

export const heroConfig = {
  // Personal Information
  name: 'Harshit Yadav',
  title: 'Software Developer • Content Creator',
  avatar: '/assets/logo.png',

  // Skills Configuration
  skills: [
    {
      name: 'Java',
      href: 'https://www.java.com/',
      component: 'Java',
    },
    {
      name: 'Spring Boot',
      href: 'https://spring.io/projects/spring-boot',
      component: 'SpringBoot',
    },
    {
      name: 'Firebase',
      href: 'https://firebase.google.com/',
      component: 'Firebase',
    },
    {
      name: 'React',
      href: 'https://react.dev/',
      component: 'ReactIcon',
    },
    {
      name: 'Next.js',
      href: 'https://nextjs.org/',
      component: 'NextJs',
    },
  ],

  // Description Configuration
  description: {
    template:
      'Building apps, content, and systems using {skills:0}, {skills:1}, {skills:2}, {skills:3} and {skills:4}. Passionate about creating <b>impactful digital products</b>, growing a personal brand, and turning ideas into <b>scalable businesses</b>.',
  },

  // Buttons Configuration
  buttons: [
    {
      variant: 'outline',
      text: 'Resume / CV',
      href: '/resume',
      icon: 'CV',
    },
    {
      variant: 'default',
      text: 'Get in touch',
      href: '/contact',
      icon: 'Chat',
    },
  ],
};

// Social Links Configuration
export const socialLinks = [
  {
    name: 'X',
    href: 'https://x.com/HxshitYadav',
    icon: <X />,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/hxshityadav',
    icon: <LinkedIn />,
  },
  {
    name: 'Github',
    href: 'https://github.com/HxshitYadav',
    icon: <Github />,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/hxshityadav',
    icon: <Instagram />,
  },
  {
    name: 'Medium',
    href: 'https://medium.com/@hxshityadav',
    icon: <Medium />,
  },
  {
    name: 'Email',
    href: 'mailto:hxrshityadav@gmail.com',
    icon: <Mail />,
  },
];
