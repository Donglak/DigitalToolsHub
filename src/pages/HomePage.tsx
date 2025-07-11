import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, TrendingUp, DollarSign, Star, Users, Award, CheckCircle, Mail, Server, Palette, Zap } from 'lucide-react';
import NewsletterForm from '../components/NewsletterForm';
import { tools } from '../data/tools';

const HomePage = () => {
  const categories = [
    {
      icon: Bot,
      title: 'AI Tools',
      description: 'Cutting-edge artificial intelligence tools to automate and enhance your workflow',
      color: 'from-blue-500 to-purple-600',
      tools: `${tools.filter(t => t.category === 'ai').length}+ Tools`
    },
    {
      icon: TrendingUp,
      title: 'Marketing Tools',
      description: 'Powerful marketing automation and analytics tools to grow your business',
      color: 'from-green-500 to-teal-600',
      tools: `${tools.filter(t => t.category === 'marketing').length}+ Tools`
    },
    {
      icon: DollarSign,
      title: 'MMO Tools',
      description: 'Proven tools and platforms to help you make money online effectively',
      color: 'from-orange-500 to-red-600',
      tools: `${tools.filter(t => t.category === 'mmo').length}+ Tools`
    },
    {
      icon: Server,
      title: 'SaaS Tools',
      description: 'Software-as-a-Service solutions for business productivity and collaboration',
      color: 'from-indigo-500 to-blue-600',
      tools: `${tools.filter(t => t.category === 'saas').length}+ Tools`
    },
    {
      icon: Palette,
      title: 'Design Tools',
      description: 'Creative design software for graphics, UI/UX, and digital art creation',
      color: 'from-pink-500 to-rose-600',
      tools: `${tools.filter(t => t.category === 'design').length}+ Tools`
    },
    {
      icon: Zap,
      title: 'Automation Tools',
      description: 'Workflow automation and integration tools to streamline your processes',
      color: 'from-yellow-500 to-orange-600',
      tools: `${tools.filter(t => t.category === 'automation').length}+ Tools`
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Digital Marketer',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'DigitalToolsHub helped me discover AI tools that increased my productivity by 300%. The reviews are honest and detailed.',
      rating: 5,
      earnings: '$15K+ saved on tools'
    },
    {
      name: 'Mike Chen',
      role: 'Online Entrepreneur',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'Found the perfect marketing automation stack through this platform. My conversion rates doubled in 3 months.',
      rating: 5,
      earnings: '$50K+ revenue increase'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Content Creator',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'The MMO tools section is a goldmine. I built my entire online business using recommendations from here.',
      rating: 5,
      earnings: '$25K+ monthly income'
    }
  ];

  const stats = [
    { number: `${tools.length}+`, label: 'Digital Tools' },
    { number: '50K+', label: 'Happy Users' },
    { number: '98%', label: 'Success Rate' },
    { number: '$2M+', label: 'Saved by Users' }
  ];

  // Get trending tools (featured tools with high ratings)
  const trendingTools = tools
    .filter(tool => tool.featured)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                Discover the Best
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> Digital Tools</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Find, compare, and access the most powerful AI tools, marketing software, and MMO platforms. 
                Boost your productivity and income with expert-curated recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/tools"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Explore Tools
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/blog"
                  className="border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2"
                >
                  Read Guides
                </Link>
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-large">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Trending Tools</h3>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {trendingTools.map((tool, index) => (
                    <Link
                      key={tool.id}
                      to={`/tools/${tool.id}`}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${categories[index]?.color || 'from-gray-500 to-gray-600'} rounded-lg flex items-center justify-center`}>
                          {tool.category === 'ai' && <Bot className="w-5 h-5 text-white" />}
                          {tool.category === 'marketing' && <TrendingUp className="w-5 h-5 text-white" />}
                          {tool.category === 'mmo' && <DollarSign className="w-5 h-5 text-white" />}
                          {tool.category === 'saas' && <Server className="w-5 h-5 text-white" />}
                          {tool.category === 'design' && <Palette className="w-5 h-5 text-white" />}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{tool.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">{tool.category} Tool</div>
                        </div>
                      </div>
                      <div className="text-green-600 dark:text-green-400 font-semibold">
                        {tool.price.split(' ')[0]}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in">
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Tool Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover powerful digital tools across five main categories designed to boost your productivity and income
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <div className="xl:col-span-5">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.slice(0, 6).map((category, index) => (
                  <Link
                    key={index}
                    to={`/tools?category=${category.title.toLowerCase().replace(' tools', '')}`}
                    className="group bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-soft hover:shadow-large transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {category.tools}
                      </span>
                      <ArrowRight className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Subcategories Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              AI Tools by Category
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore specialized AI tools organized by their specific use cases and applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'AI Productivity Tools', icon: Bot, color: 'from-blue-500 to-indigo-600', count: tools.filter(t => t.subcategory === 'AI Productivity Tools').length },
              { name: 'AI Text Generators', icon: TrendingUp, color: 'from-green-500 to-emerald-600', count: tools.filter(t => t.subcategory === 'AI Text Generators').length },
              { name: 'AI Image Tools', icon: Palette, color: 'from-purple-500 to-pink-600', count: tools.filter(t => t.subcategory === 'AI Image Tools').length },
              { name: 'AI Art Generators', icon: Palette, color: 'from-pink-500 to-rose-600', count: tools.filter(t => t.subcategory === 'AI Art Generators').length },
              { name: 'AI Video Tools', icon: Server, color: 'from-red-500 to-orange-600', count: tools.filter(t => t.subcategory === 'AI Video Tools').length },
              { name: 'AI Audio Generators', icon: Server, color: 'from-yellow-500 to-amber-600', count: tools.filter(t => t.subcategory === 'AI Audio Generators').length },
              { name: 'AI Code Tools', icon: Bot, color: 'from-indigo-500 to-blue-600', count: tools.filter(t => t.subcategory === 'AI Code Tools').length },
              { name: 'AI Business Tools', icon: DollarSign, color: 'from-teal-500 to-cyan-600', count: tools.filter(t => t.subcategory === 'AI Business Tools').length },
              { name: 'Misc AI Tools', icon: Zap, color: 'from-gray-500 to-slate-600', count: tools.filter(t => t.subcategory === 'Misc AI Tools').length }
            ].map((subcategory, index) => (
              <Link
                key={index} 
                to={`/tools?subcategory=${encodeURIComponent(subcategory.name)}`}
                className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`w-10 h-10 bg-gradient-to-r ${subcategory.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <subcategory.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {subcategory.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {subcategory.count} tools
                  </span>
                  <ArrowRight className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See how our community is achieving amazing results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-2 rounded-lg text-sm font-medium">
                  {testimonial.earnings}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12">
            <Mail className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Stay Ahead of the Curve
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get weekly updates on the latest digital tools, exclusive deals, and expert insights 
              delivered straight to your inbox.
            </p>
            
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;