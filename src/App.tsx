import React, { useState } from 'react';
import { ChevronLeft, Wifi, Battery, Signal, Clock } from 'lucide-react';

// Define the conversation tree structure
interface Option {
  id: string;
  text: string;
  nextNodeId: string;
}

interface Node {
  id: string;
  message: string;
  options: Option[];
  isEndpoint?: boolean;
}

// Create the conversation tree
const conversationTree: Node[] = [
  {
    id: 'welcome',
    message: 'Welcome to Customer Service. How may I assist you today?',
    options: [
      { id: 'billing', text: 'Billing Issues', nextNodeId: 'billing-options' },
      { id: 'technical', text: 'Technical Support', nextNodeId: 'technical-options' },
      { id: 'account', text: 'Account Management', nextNodeId: 'account-options' },
      { id: 'product', text: 'Product Information', nextNodeId: 'product-options' },
      { id: 'other', text: 'Other Inquiries', nextNodeId: 'other-options' },
    ],
  },
  {
    id: 'billing-options',
    message: 'Please select your billing issue:',
    options: [
      { id: 'bill-payment', text: 'Payment Methods', nextNodeId: 'bill-payment-options' },
      { id: 'bill-dispute', text: 'Dispute a Charge', nextNodeId: 'bill-dispute-options' },
      { id: 'bill-missing', text: 'Missing Invoice', nextNodeId: 'bill-missing-options' },
      { id: 'bill-back', text: 'Go Back', nextNodeId: 'welcome' },
    ],
  },
  {
    id: 'bill-payment-options',
    message: 'What payment method would you like to inquire about?',
    options: [
      { id: 'credit-card', text: 'Credit Card', nextNodeId: 'endpoint' },
      { id: 'bank-transfer', text: 'Bank Transfer', nextNodeId: 'endpoint' },
      { id: 'paypal', text: 'PayPal', nextNodeId: 'endpoint' },
      { id: 'payment-back', text: 'Go Back', nextNodeId: 'billing-options' },
    ],
  },
  {
    id: 'bill-dispute-options',
    message: 'What type of charge would you like to dispute?',
    options: [
      { id: 'dispute-subscription', text: 'Subscription Fee', nextNodeId: 'endpoint' },
      { id: 'dispute-onetime', text: 'One-time Purchase', nextNodeId: 'endpoint' },
      { id: 'dispute-recurring', text: 'Recurring Charge', nextNodeId: 'endpoint' },
      { id: 'dispute-back', text: 'Go Back', nextNodeId: 'billing-options' },
    ],
  },
  {
    id: 'bill-missing-options',
    message: 'For which billing period is your invoice missing?',
    options: [
      { id: 'missing-current', text: 'Current Month', nextNodeId: 'endpoint' },
      { id: 'missing-previous', text: 'Previous Month', nextNodeId: 'endpoint' },
      { id: 'missing-older', text: 'Older Than 2 Months', nextNodeId: 'endpoint' },
      { id: 'missing-back', text: 'Go Back', nextNodeId: 'billing-options' },
    ],
  },
  {
    id: 'technical-options',
    message: 'Please select your technical issue:',
    options: [
      { id: 'tech-login', text: 'Login Problems', nextNodeId: 'tech-login-options' },
      { id: 'tech-performance', text: 'Performance Issues', nextNodeId: 'tech-performance-options' },
      { id: 'tech-error', text: 'Error Messages', nextNodeId: 'tech-error-options' },
      { id: 'tech-back', text: 'Go Back', nextNodeId: 'welcome' },
    ],
  },
  {
    id: 'tech-login-options',
    message: 'What login issue are you experiencing?',
    options: [
      { id: 'login-forgot', text: 'Forgot Password', nextNodeId: 'endpoint' },
      { id: 'login-reset', text: 'Password Reset Not Working', nextNodeId: 'endpoint' },
      { id: 'login-locked', text: 'Account Locked', nextNodeId: 'endpoint' },
      { id: 'login-back', text: 'Go Back', nextNodeId: 'technical-options' },
    ],
  },
  {
    id: 'tech-performance-options',
    message: 'What performance issue are you experiencing?',
    options: [
      { id: 'perf-slow', text: 'Slow Loading', nextNodeId: 'endpoint' },
      { id: 'perf-crash', text: 'Application Crashes', nextNodeId: 'endpoint' },
      { id: 'perf-freeze', text: 'Screen Freezes', nextNodeId: 'endpoint' },
      { id: 'perf-back', text: 'Go Back', nextNodeId: 'technical-options' },
    ],
  },
  {
    id: 'tech-error-options',
    message: 'What type of error message are you seeing?',
    options: [
      { id: 'error-404', text: '404 Not Found', nextNodeId: 'endpoint' },
      { id: 'error-500', text: '500 Server Error', nextNodeId: 'endpoint' },
      { id: 'error-connection', text: 'Connection Error', nextNodeId: 'endpoint' },
      { id: 'error-other', text: 'Other Error Code', nextNodeId: 'endpoint' },
      { id: 'error-back', text: 'Go Back', nextNodeId: 'technical-options' },
    ],
  },
  {
    id: 'account-options',
    message: 'Please select your account management issue:',
    options: [
      { id: 'account-update', text: 'Update Personal Information', nextNodeId: 'account-update-options' },
      { id: 'account-cancel', text: 'Cancel Subscription', nextNodeId: 'account-cancel-options' },
      { id: 'account-upgrade', text: 'Upgrade Account', nextNodeId: 'account-upgrade-options' },
      { id: 'account-back', text: 'Go Back', nextNodeId: 'welcome' },
    ],
  },
  {
    id: 'account-update-options',
    message: 'What information would you like to update?',
    options: [
      { id: 'update-email', text: 'Email Address', nextNodeId: 'endpoint' },
      { id: 'update-phone', text: 'Phone Number', nextNodeId: 'endpoint' },
      { id: 'update-address', text: 'Mailing Address', nextNodeId: 'endpoint' },
      { id: 'update-name', text: 'Name', nextNodeId: 'endpoint' },
      { id: 'update-back', text: 'Go Back', nextNodeId: 'account-options' },
    ],
  },
  {
    id: 'account-cancel-options',
    message: 'What type of subscription would you like to cancel?',
    options: [
      { id: 'cancel-monthly', text: 'Monthly Plan', nextNodeId: 'endpoint' },
      { id: 'cancel-annual', text: 'Annual Plan', nextNodeId: 'endpoint' },
      { id: 'cancel-trial', text: 'Free Trial', nextNodeId: 'endpoint' },
      { id: 'cancel-back', text: 'Go Back', nextNodeId: 'account-options' },
    ],
  },
  {
    id: 'account-upgrade-options',
    message: 'Which plan would you like to upgrade to?',
    options: [
      { id: 'upgrade-premium', text: 'Premium Plan', nextNodeId: 'endpoint' },
      { id: 'upgrade-business', text: 'Business Plan', nextNodeId: 'endpoint' },
      { id: 'upgrade-enterprise', text: 'Enterprise Plan', nextNodeId: 'endpoint' },
      { id: 'upgrade-back', text: 'Go Back', nextNodeId: 'account-options' },
    ],
  },
  {
    id: 'product-options',
    message: 'What product information are you looking for?',
    options: [
      { id: 'product-features', text: 'Product Features', nextNodeId: 'product-features-options' },
      { id: 'product-pricing', text: 'Pricing Information', nextNodeId: 'product-pricing-options' },
      { id: 'product-compatibility', text: 'Compatibility', nextNodeId: 'product-compatibility-options' },
      { id: 'product-back', text: 'Go Back', nextNodeId: 'welcome' },
    ],
  },
  {
    id: 'product-features-options',
    message: 'Which product features would you like to learn about?',
    options: [
      { id: 'features-basic', text: 'Basic Features', nextNodeId: 'endpoint' },
      { id: 'features-advanced', text: 'Advanced Features', nextNodeId: 'endpoint' },
      { id: 'features-new', text: 'New Features', nextNodeId: 'endpoint' },
      { id: 'features-back', text: 'Go Back', nextNodeId: 'product-options' },
    ],
  },
  {
    id: 'product-pricing-options',
    message: 'Which pricing plan would you like information about?',
    options: [
      { id: 'pricing-free', text: 'Free Plan', nextNodeId: 'endpoint' },
      { id: 'pricing-standard', text: 'Standard Plan', nextNodeId: 'endpoint' },
      { id: 'pricing-premium', text: 'Premium Plan', nextNodeId: 'endpoint' },
      { id: 'pricing-back', text: 'Go Back', nextNodeId: 'product-options' },
    ],
  },
  {
    id: 'product-compatibility-options',
    message: 'Which device compatibility information do you need?',
    options: [
      { id: 'compat-windows', text: 'Windows', nextNodeId: 'endpoint' },
      { id: 'compat-mac', text: 'Mac', nextNodeId: 'endpoint' },
      { id: 'compat-mobile', text: 'Mobile Devices', nextNodeId: 'endpoint' },
      { id: 'compat-browser', text: 'Web Browsers', nextNodeId: 'endpoint' },
      { id: 'compat-back', text: 'Go Back', nextNodeId: 'product-options' },
    ],
  },
  {
    id: 'other-options',
    message: 'Please select from the following options:',
    options: [
      { id: 'other-feedback', text: 'Provide Feedback', nextNodeId: 'other-feedback-options' },
      { id: 'other-contact', text: 'Contact Information', nextNodeId: 'other-contact-options' },
      { id: 'other-hours', text: 'Business Hours', nextNodeId: 'other-hours-options' },
      { id: 'other-back', text: 'Go Back', nextNodeId: 'welcome' },
    ],
  },
  {
    id: 'other-feedback-options',
    message: 'What type of feedback would you like to provide?',
    options: [
      { id: 'feedback-product', text: 'Product Feedback', nextNodeId: 'endpoint' },
      { id: 'feedback-service', text: 'Service Feedback', nextNodeId: 'endpoint' },
      { id: 'feedback-website', text: 'Website Feedback', nextNodeId: 'endpoint' },
      { id: 'feedback-back', text: 'Go Back', nextNodeId: 'other-options' },
    ],
  },
  {
    id: 'other-contact-options',
    message: 'Which contact information are you looking for?',
    options: [
      { id: 'contact-phone', text: 'Phone Number', nextNodeId: 'endpoint' },
      { id: 'contact-email', text: 'Email Address', nextNodeId: 'endpoint' },
      { id: 'contact-address', text: 'Mailing Address', nextNodeId: 'endpoint' },
      { id: 'contact-back', text: 'Go Back', nextNodeId: 'other-options' },
    ],
  },
  {
    id: 'other-hours-options',
    message: 'Which business hours information do you need?',
    options: [
      { id: 'hours-weekday', text: 'Weekday Hours', nextNodeId: 'endpoint' },
      { id: 'hours-weekend', text: 'Weekend Hours', nextNodeId: 'endpoint' },
      { id: 'hours-holiday', text: 'Holiday Hours', nextNodeId: 'endpoint' },
      { id: 'hours-back', text: 'Go Back', nextNodeId: 'other-options' },
    ],
  },
  {
    id: 'endpoint',
    message: 'I apologize, but I cannot find this information. Would you like to speak with a human representative?',
    options: [
      { id: 'human-yes', text: 'Yes, connect me to a representative', nextNodeId: 'human-connect' },
      { id: 'human-no', text: 'No, I\'ll try something else', nextNodeId: 'welcome' },
    ],
    isEndpoint: true,
  },
  {
    id: 'human-connect',
    message: 'Please wait while we connect you to the next available representative. Your estimated wait time is 45 minutes.',
    options: [
      { id: 'wait-cancel', text: 'Cancel and return to main menu', nextNodeId: 'welcome' },
    ],
    isEndpoint: true,
  },
];

function App() {
  const [currentNodeId, setCurrentNodeId] = useState('welcome');
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Find the current node in the conversation tree
  const currentNode = conversationTree.find(node => node.id === currentNodeId);

  // Handle option selection
  const handleOptionSelect = (nextNodeId: string, optionText: string) => {
    // Add the selected option to the conversation history
    setConversationHistory([...conversationHistory, optionText]);
    
    // Simulate typing delay
    setIsTyping(true);
    setTimeout(() => {
      setCurrentNodeId(nextNodeId);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {/* Mobile device frame */}
      <div className="max-w-sm w-full mx-auto bg-black rounded-[3rem] shadow-2xl overflow-hidden border-8 border-black relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-3xl z-10"></div>
        
        {/* Status bar */}
        <div className="bg-black text-white p-2 flex justify-between items-center h-10 z-0">
          <div className="text-xs font-medium">{currentTime}</div>
          <div className="flex items-center space-x-2">
            <Signal className="h-3.5 w-3.5" />
            <Wifi className="h-3.5 w-3.5" />
            <Battery className="h-3.5 w-3.5" />
          </div>
        </div>
        
        {/* App header */}
        <div className="bg-blue-600 text-white p-3 shadow-md flex items-center">
          <h1 className="text-lg font-bold flex-1 text-center">Customer Service</h1>
        </div>
        
        {/* Chat container */}
        <div className="flex-1 flex flex-col bg-gray-100 h-[70vh]">
          {/* Chat history */}
          <div className="flex-1 p-4 overflow-y-auto bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-cover bg-center bg-opacity-50">
            <div className="space-y-4">
              {/* Welcome message */}
              {conversationHistory.length === 0 && (
                <div className="flex items-start">
                  <div className="bg-white rounded-2xl p-3 max-w-[80%] shadow-sm">
                    <p className="text-gray-800">Welcome to Customer Service. How may I assist you today?</p>
                    <span className="text-xs text-gray-500 block mt-1 text-right">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Conversation history */}
              {conversationHistory.map((message, index) => (
                <React.Fragment key={index}>
                  {/* User message */}
                  <div className="flex items-start justify-end">
                    <div className="bg-blue-500 text-white rounded-2xl p-3 max-w-[80%] shadow-sm">
                      <p>{message}</p>
                      <span className="text-xs text-blue-100 block mt-1 text-right">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  
                  {/* Bot response (except for the last one which is shown in the current node) */}
                  {index < conversationHistory.length - 1 && (
                    <div className="flex items-start">
                      <div className="bg-white rounded-2xl p-3 max-w-[80%] shadow-sm">
                        <p className="text-gray-800">
                          {conversationTree.find(node => 
                            node.options.some(option => option.text === message)
                          )?.options.find(option => option.text === message)?.nextNodeId === 'endpoint'
                            ? 'I apologize, but I cannot find this information. Would you like to speak with a human representative?'
                            : conversationTree.find(node => 
                                node.id === conversationTree.find(n => 
                                  n.options.some(o => o.text === message)
                                )?.options.find(o => o.text === message)?.nextNodeId
                              )?.message}
                        </p>
                        <span className="text-xs text-gray-500 block mt-1 text-right">
                          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
              
              {/* Current bot message */}
              {currentNode && conversationHistory.length > 0 && (
                <div className="flex items-start">
                  <div className="bg-white rounded-2xl p-3 max-w-[80%] shadow-sm">
                    <p className="text-gray-800">{currentNode.message}</p>
                    <span className="text-xs text-gray-500 block mt-1 text-right">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start">
                  <div className="bg-white rounded-2xl p-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Options */}
          <div className="p-3 border-t border-gray-200 bg-white">
            {currentNode && !isTyping && (
              <div className="space-y-2">
                {currentNode.options.map((option) => (
                  <button
                    key={option.id}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center transition-colors shadow-sm"
                    onClick={() => handleOptionSelect(option.nextNodeId, option.text)}
                  >
                    {option.text.includes('Go Back') && <ChevronLeft className="mr-2 h-4 w-4" />}
                    {option.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Home indicator */}
        <div className="h-1 w-1/3 bg-white mx-auto my-2 rounded-full"></div>
      </div>
      
      {/* Disclaimer */}
      <div className="mt-4 text-xs text-gray-400 text-center absolute bottom-2 left-0 right-0">
        <p>This is a simulation of a traditional rule-based chatbot with limited capabilities.</p>
        <p>It demonstrates the typical frustrating experience of legacy customer service systems.</p>
      </div>
    </div>
  );
}

export default App;