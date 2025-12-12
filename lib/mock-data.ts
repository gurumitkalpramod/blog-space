export type User = {
  id: string;
  name: string;
  avatar: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: User;
  category: Category;
  publishedAt: string;
  readTime: string;
  featured?: boolean;
};

export const categories: Category[] = [
  { id: "1", name: "Technology", slug: "technology" },
  { id: "2", name: "Lifestyle", slug: "lifestyle" },
  { id: "3", name: "Travel", slug: "travel" },
  { id: "4", name: "Design", slug: "design" },
];

export const users: User[] = [
  {
    id: "1",
    name: "Alex Morgan",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
];

export const blogs: Blog[] = [
  {
    id: "1",
    title: "The Future of AI in Web Development",
    slug: "future-of-ai-web-dev",
    excerpt: "Artificial Intelligence is reshaping how we build the web. From automated testing to code generation, explore the next frontier.",
    content: "Full content here...",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    author: users[0],
    category: categories[0],
    publishedAt: "2024-03-15",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: "2",
    title: "Minimalism in UI Design: Less is More",
    slug: "minimalism-ui-design",
    excerpt: "Why the best interfaces feel invisible. A deep dive into negative space, typography, and color theory.",
    content: "Full content here...",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    author: users[1],
    category: categories[3],
    publishedAt: "2024-03-12",
    readTime: "4 min read",
    featured: true,
  },
  {
    id: "3",
    title: "Eco-Friendly Travel: A Guide for 2024",
    slug: "eco-friendly-travel-2024",
    excerpt: "Discover how to explore the world while minimizing your carbon footprint. Top destinations for sustainable tourism.",
    content: "Full content here...",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    author: users[0],
    category: categories[2],
    publishedAt: "2024-03-10",
    readTime: "6 min read",
    featured: false,
  },
    {
    id: "4",
    title: "Mastering React Server Components",
    slug: "mastering-react-server-components",
    excerpt: "Understand the paradigm shift in React 19. How server components improve performance and simplify data fetching.",
    content: "Full content here...",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    author: users[1],
    category: categories[0],
    publishedAt: "2024-03-08",
    readTime: "8 min read",
    featured: false,
  },
  {
    id: "5",
    title: "10 Daily Habits for a Productive Life",
    slug: "10-daily-habits",
    excerpt: "Small changes that lead to big results. Transform your daily routine with these science-backed habits.",
    content: "Full content here...",
    image: "https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    author: users[0],
    category: categories[1],
    publishedAt: "2024-03-05",
    readTime: "3 min read",
    featured: false,
  },
];
