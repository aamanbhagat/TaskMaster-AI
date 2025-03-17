import React from 'react';
import { Search, Book, MessageCircle, Phone, Mail, FileText } from 'lucide-react';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';

export const Help: React.FC = () => {
  const helpCategories = [
    {
      icon: <Book className="w-6 h-6" />,
      title: 'Documentation',
      description: 'Detailed guides and documentation',
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Community Forum',
      description: 'Connect with other users',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Support',
      description: '24/7 customer support',
    },
  ];

  const faqItems = [
    {
      question: 'How do I create a new project?',
      answer: 'To create a new project, click the "New Project" button in the Projects section. Fill in the required details and click "Create".',
    },
    {
      question: 'Can I invite team members?',
      answer: 'Yes, you can invite team members by going to the Team section and clicking "Add Member". Enter their email address to send an invitation.',
    },
    {
      question: 'How do I track project progress?',
      answer: 'Project progress is automatically calculated based on completed tasks. You can view progress in the project dashboard.',
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">How can we help you?</h1>
        <p className="text-gray-500 mt-2">Search our help center or browse categories below</p>
        
        <div className="max-w-xl mx-auto mt-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Search for help..."
            />
          </div>
        </div>
      </div>

      {/* Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {helpCategories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:border-blue-500 transition-colors cursor-pointer"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mb-4">
              {category.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
            <p className="text-gray-500">{category.description}</p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{item.question}</h3>
              <p className="text-gray-500">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Still need help?</h2>
        <p className="text-gray-500 mb-6">Our support team is always ready to assist you</p>
        <div className="flex justify-center space-x-4">
          <Button
            look="outline"
            icon={<Mail className="w-4 h-4" />}
          >
            Email Support
          </Button>
          <Button
            themeColor="primary"
            icon={<MessageCircle className="w-4 h-4" />}
          >
            Live Chat
          </Button>
        </div>
      </div>
    </div>
  );
};