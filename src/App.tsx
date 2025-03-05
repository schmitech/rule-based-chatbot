import React, { useState, useEffect } from 'react';
import { ChevronLeft, Calendar, Users, Clock3, Trash2 } from 'lucide-react';

// Define interfaces
interface Activity {
  id: string;
  activityName: string;
  category: string;
  location: string;
  ageGroup: string;
  startDate: string;
  endDate: string;
  time: string;
  price: number;
  spotsAvailable: number;
  activityCode: string;
  description: string;
  language: string[];
  status: string;
  daysOfWeek: string[];
  registrationUrl: string;
  waitlistUrl?: string;
}

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
  imageUrl?: string; // Optional image URL for visual nodes
}

function App() {
  // State variables
  const [currentNodeId, setCurrentNodeId] = useState('welcome');
  const [conversationHistory, setConversationHistory] = useState<{ message: string; isUser: boolean }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Scroll to bottom when conversation history changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversationHistory, isTyping]);

  // Sample activities data
  const activitiesData: Activity[] = [
    // Your activities data here
  ];

  // Create the conversation tree
  const conversationTree: Node[] = [
    {
      id: 'welcome',
      message: 'Welcome to Recreation Activities Finder. How would you like to search for activities?',
      options: [
        { id: 'by-category', text: 'Search by Category', nextNodeId: 'category-options' },
        { id: 'by-age', text: 'Search by Age Group', nextNodeId: 'age-options' },
        { id: 'by-location', text: 'Search by Location', nextNodeId: 'location-options' },
        { id: 'by-status', text: 'Search by Availability', nextNodeId: 'status-options' },
        { id: 'by-price', text: 'Search by Price Range', nextNodeId: 'price-options' },
        { id: 'by-language', text: 'Search by Language', nextNodeId: 'language-options' },
        { id: 'by-day', text: 'Search by Day of Week', nextNodeId: 'day-options' },
        { id: 'featured', text: 'Featured Activities', nextNodeId: 'featured-activities' },
        { id: 'view-all', text: 'View All Activities', nextNodeId: 'all-activities' },
      ],
      imageUrl: 'https://img.freepik.com/free-vector/abstract-colorful-shapes-background_52683-12010.jpg'
    },
    // Category options
    {
      id: 'category-options',
      message: 'What category of activities are you interested in?',
      options: [
        { id: 'sports', text: 'Sports', nextNodeId: 'sports-activities' },
        { id: 'arts', text: 'Arts & Crafts', nextNodeId: 'arts-activities' },
        { id: 'music', text: 'Music & Dance', nextNodeId: 'music-activities' },
        { id: 'education', text: 'Education', nextNodeId: 'education-activities' },
        { id: 'outdoor', text: 'Outdoor Activities', nextNodeId: 'outdoor-activities' },
        { id: 'back', text: 'Go Back', nextNodeId: 'welcome' },
      ],
      imageUrl: 'https://img.freepik.com/free-vector/flat-design-sports-collection_23-2148985390.jpg'
    },
    // Age group options
    {
      id: 'age-options',
      message: 'What age group are you looking for?',
      options: [
        { id: 'toddler', text: 'Toddlers (0-3)', nextNodeId: 'toddler-activities' },
        { id: 'preschool', text: 'Preschool (3-5)', nextNodeId: 'preschool-activities' },
        { id: 'children', text: 'Children (6-12)', nextNodeId: 'children-activities' },
        { id: 'teens', text: 'Teens (13-18)', nextNodeId: 'teen-activities' },
        { id: 'adults', text: 'Adults (18+)', nextNodeId: 'adult-activities' },
        { id: 'seniors', text: 'Seniors (55+)', nextNodeId: 'senior-activities' },
        { id: 'back', text: 'Go Back', nextNodeId: 'welcome' },
      ],
      imageUrl: 'https://img.freepik.com/free-vector/flat-design-age-groups-collection_23-2149211100.jpg'
    },
    // Location options
    {
      id: 'location-options',
      message: 'Where would you like to find activities?',
      options: [
        { id: 'downtown', text: 'Downtown', nextNodeId: 'downtown-activities' },
        { id: 'north', text: 'North End', nextNodeId: 'north-activities' },
        { id: 'south', text: 'South End', nextNodeId: 'south-activities' },
        { id: 'east', text: 'East Side', nextNodeId: 'east-activities' },
        { id: 'west', text: 'West Side', nextNodeId: 'west-activities' },
        { id: 'back', text: 'Go Back', nextNodeId: 'welcome' },
      ],
      imageUrl: 'https://img.freepik.com/free-vector/city-map-with-pins-navigation-app_23-2148899174.jpg'
    },
    // Status options
    {
      id: 'status-options',
      message: 'What availability are you looking for?',
      options: [
        { id: 'open', text: 'Open for Registration', nextNodeId: 'open-activities' },
        { id: 'waitlist', text: 'Waitlist Available', nextNodeId: 'waitlist-activities' },
        { id: 'limited', text: 'Limited Spots', nextNodeId: 'limited-activities' },
        { id: 'back', text: 'Go Back', nextNodeId: 'welcome' },
      ]
    },
    // Price options
    {
      id: 'price-options',
      message: 'What price range are you looking for?',
      options: [
        { id: 'free', text: 'Free', nextNodeId: 'free-activities' },
        { id: 'low', text: 'Under $50', nextNodeId: 'low-price-activities' },
        { id: 'medium', text: '$50-$100', nextNodeId: 'medium-price-activities' },
        { id: 'high', text: 'Over $100', nextNodeId: 'high-price-activities' },
        { id: 'back', text: 'Go Back', nextNodeId: 'welcome' },
      ]
    },
    // Language options
    {
      id: 'language-options',
      message: 'What language would you prefer for the activities?',
      options: [
        { id: 'english', text: 'English', nextNodeId: 'english-activities' },
        { id: 'french', text: 'French', nextNodeId: 'french-activities' },
        { id: 'spanish', text: 'Spanish', nextNodeId: 'spanish-activities' },
        { id: 'mandarin', text: 'Mandarin', nextNodeId: 'mandarin-activities' },
        { id: 'back', text: 'Go Back', nextNodeId: 'welcome' },
      ]
    },
    // Day options
    {
      id: 'day-options',
      message: 'What day of the week are you looking for?',
      options: [
        { id: 'monday', text: 'Monday', nextNodeId: 'monday-activities' },
        { id: 'tuesday', text: 'Tuesday', nextNodeId: 'tuesday-activities' },
        { id: 'wednesday', text: 'Wednesday', nextNodeId: 'wednesday-activities' },
        { id: 'thursday', text: 'Thursday', nextNodeId: 'thursday-activities' },
        { id: 'friday', text: 'Friday', nextNodeId: 'friday-activities' },
        { id: 'weekend', text: 'Weekend', nextNodeId: 'weekend-activities' },
        { id: 'back', text: 'Go Back', nextNodeId: 'welcome' },
      ]
    },
    // Sample activity nodes
    {
      id: 'sports-activities',
      message: 'Here are some sports activities available:',
      options: [
        { id: 'soccer', text: 'Youth Soccer - 5 spots left!', nextNodeId: 'soccer-details' },
        { id: 'swimming', text: 'Swimming Lessons - Register Now', nextNodeId: 'swimming-details' },
        { id: 'basketball', text: 'Basketball Camp - Join Waitlist', nextNodeId: 'basketball-details' },
        { id: 'tennis', text: 'Tennis Clinic - No Registration Available', nextNodeId: 'tennis-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'category-options' },
      ]
    },
    // Sample details node
    {
      id: 'soccer-details',
      message: 'Youth Soccer Program\n\nAge Group: 6-12 years\nLocation: Community Park Fields\nDays: Tuesdays and Thursdays\nTime: 4:00 PM - 5:30 PM\nPrice: $85\nSpots Available: 5\n\nThis program focuses on developing soccer skills in a fun, supportive environment. All skill levels welcome!',
      options: [
        { id: 'register', text: 'Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'sports-activities' },
      ]
    },
    {
      id: 'swimming-details',
      message: 'Swimming Lessons\n\nAge Group: 3-12 years\nLocation: Community Center Pool\nDays: Mondays, Wednesdays, and Fridays\nTime: 3:30 PM - 4:30 PM\nPrice: $120\nSpots Available: 8\n\nLearn essential swimming skills with certified instructors. Classes are divided by age and skill level.',
      options: [
        { id: 'register', text: 'Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'sports-activities' },
      ]
    },
    {
      id: 'basketball-details',
      message: 'Basketball Camp\n\nAge Group: 8-14 years\nLocation: Recreation Center\nDays: Weekdays (Summer)\nTime: 9:00 AM - 3:00 PM\nPrice: $250\nSpots Available: 0 (Waitlist Available)\n\nA week-long intensive basketball camp focusing on fundamentals, teamwork, and game strategy.',
      options: [
        { id: 'waitlist', text: 'Join Waitlist', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'sports-activities' },
      ]
    },
    {
      id: 'tennis-details',
      message: 'Tennis Clinic\n\nAge Group: 10-16 years\nLocation: City Tennis Courts\nDays: Saturdays\nTime: 10:00 AM - 12:00 PM\nPrice: $95\nSpots Available: 0 (No Waitlist)\n\nWeekly tennis clinics focusing on technique, strategy, and match play. Equipment provided.',
      options: [
        { id: 'back', text: 'Go Back', nextNodeId: 'sports-activities' },
      ]
    },
    // Arts activities
    {
      id: 'arts-activities',
      message: 'Here are some arts & crafts activities available:',
      options: [
        { id: 'painting', text: 'Painting Workshop - Register Now', nextNodeId: 'painting-details' },
        { id: 'pottery', text: 'Pottery Class - 2 spots left!', nextNodeId: 'pottery-details' },
        { id: 'crafts', text: 'Kids Crafts - Register Now', nextNodeId: 'crafts-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'category-options' },
      ]
    },
    // Art activity details
    {
      id: 'painting-details',
      message: 'Painting Workshop\n\nAge Group: All ages\nLocation: Community Center Art Room\nDays: Mondays and Saturdays\nTime: 6:00 PM - 8:00 PM (Mon), 10:00 AM - 12:00 PM (Sat)\nPrice: $65\nSpots Available: 12\n\nExplore various painting techniques with professional artists. All materials provided.',
      options: [
        { id: 'register', text: 'Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'arts-activities' },
      ]
    },
    {
      id: 'pottery-details',
      message: 'Pottery Class\n\nAge Group: 12+\nLocation: Community Center Craft Room\nDays: Thursdays\nTime: 5:00 PM - 7:00 PM\nPrice: $85\nSpots Available: 2\n\nLearn hand-building and wheel-throwing techniques. Clay and tools provided.',
      options: [
        { id: 'register', text: 'Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'arts-activities' },
      ]
    },
    {
      id: 'crafts-details',
      message: 'Kids Crafts\n\nAge Group: 5-10 years\nLocation: Community Center Art Room\nDays: Saturdays\nTime: 1:00 PM - 2:30 PM\nPrice: $45\nSpots Available: 15\n\nFun craft activities designed for children. All materials provided.',
      options: [
        { id: 'register', text: 'Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'arts-activities' },
      ]
    },
    // Music activities
    {
      id: 'music-activities',
      message: 'Here are some music & dance activities available:',
      options: [
        { id: 'piano', text: 'Piano Lessons - Register Now', nextNodeId: 'piano-details' },
        { id: 'ballet', text: 'Ballet Classes - Join Waitlist', nextNodeId: 'ballet-details' },
        { id: 'guitar', text: 'Guitar Lessons - 3 spots left!', nextNodeId: 'guitar-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'category-options' },
      ]
    },
    // Music activity details
    {
      id: 'piano-details',
      message: 'Piano Lessons\n\nAge Group: 6+\nLocation: Music Studio\nDays: Tuesdays\nTime: Various time slots available\nPrice: $120 (4 lessons)\nSpots Available: 8\n\nPrivate piano lessons with experienced instructors. All skill levels welcome.',
      options: [
        { id: 'register', text: 'Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'music-activities' },
      ]
    },
    {
      id: 'ballet-details',
      message: 'Ballet Classes\n\nAge Group: 4-12 years\nLocation: Dance Studio\nDays: Wednesdays\nTime: 4:00 PM - 5:00 PM (4-7 years), 5:15 PM - 6:30 PM (8-12 years)\nPrice: $95\nSpots Available: 0 (Waitlist Available)\n\nClassical ballet instruction for children. Recital at the end of the session.',
      options: [
        { id: 'waitlist', text: 'Join Waitlist', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'music-activities' },
      ]
    },
    {
      id: 'guitar-details',
      message: 'Guitar Lessons\n\nAge Group: 8+\nLocation: Music Studio\nDays: Fridays\nTime: Various time slots available\nPrice: $110 (4 lessons)\nSpots Available: 3\n\nPrivate guitar lessons with experienced instructors. Guitars available to borrow.',
      options: [
        { id: 'register', text: 'Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'music-activities' },
      ]
    },
    // Featured activities
    {
      id: 'featured-activities',
      message: 'Here are our featured activities this month:',
      options: [
        { id: 'summer-camp', text: 'Summer Day Camp - Register Now', nextNodeId: 'summer-camp-details' },
        { id: 'family-yoga', text: 'Family Yoga - 4 spots left!', nextNodeId: 'family-yoga-details' },
        { id: 'cooking', text: 'Kids Cooking Class - Join Waitlist', nextNodeId: 'cooking-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'welcome' },
      ],
      imageUrl: 'https://img.freepik.com/free-vector/summer-camp-concept-illustration_114360-8261.jpg'
    },
    // Featured activity details
    {
      id: 'summer-camp-details',
      message: 'Summer Day Camp\n\nAge Group: 6-12 years\nLocation: Community Center\nDays: Monday-Friday (Summer)\nTime: 9:00 AM - 4:00 PM\nPrice: $195/week\nSpots Available: 25\n\nFun-filled summer camp with sports, arts, games, and field trips. Extended care available.',
      options: [
        { id: 'register', text: 'Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'featured-activities' },
      ]
    },
    {
      id: 'family-yoga-details',
      message: 'Family Yoga\n\nAge Group: All ages\nLocation: Recreation Center Studio\nDays: Saturdays\nTime: 9:00 AM - 10:00 AM\nPrice: $60 (family of 4)\nSpots Available: 4\n\nYoga class designed for families to participate together. No experience necessary.',
      options: [
        { id: 'register', text: 'Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'featured-activities' },
      ]
    },
    {
      id: 'cooking-details',
      message: 'Kids Cooking Class\n\nAge Group: 8-12 years\nLocation: Community Center Kitchen\nDays: Fridays\nTime: 4:30 PM - 6:00 PM\nPrice: $75\nSpots Available: 0 (Waitlist Available)\n\nFun cooking classes where kids learn to make healthy snacks and meals.',
      options: [
        { id: 'waitlist', text: 'Join Waitlist', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'featured-activities' },
      ]
    },
    // Day activity nodes
    {
      id: 'monday-activities',
      message: 'Here are activities available on Mondays:',
      options: [
        { id: 'monday-swim', text: 'Swimming Lessons - Register Now', nextNodeId: 'swimming-details' },
        { id: 'monday-art', text: 'Art Class - 3 spots left!', nextNodeId: 'painting-details' },
        { id: 'monday-chess', text: 'Chess Club - Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'day-options' },
      ]
    },
    {
      id: 'tuesday-activities',
      message: 'Here are activities available on Tuesdays:',
      options: [
        { id: 'tuesday-soccer', text: 'Youth Soccer - 5 spots left!', nextNodeId: 'soccer-details' },
        { id: 'tuesday-music', text: 'Music Lessons - Register Now', nextNodeId: 'piano-details' },
        { id: 'tuesday-science', text: 'Science Club - Join Waitlist', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'day-options' },
      ]
    },
    {
      id: 'wednesday-activities',
      message: 'Here are activities available on Wednesdays:',
      options: [
        { id: 'wednesday-swim', text: 'Swimming Lessons - Register Now', nextNodeId: 'swimming-details' },
        { id: 'wednesday-dance', text: 'Dance Class - 2 spots left!', nextNodeId: 'ballet-details' },
        { id: 'wednesday-coding', text: 'Coding Club - Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'day-options' },
      ]
    },
    {
      id: 'thursday-activities',
      message: 'Here are activities available on Thursdays:',
      options: [
        { id: 'thursday-soccer', text: 'Youth Soccer - 5 spots left!', nextNodeId: 'soccer-details' },
        { id: 'thursday-art', text: 'Pottery Class - 2 spots left!', nextNodeId: 'pottery-details' },
        { id: 'thursday-drama', text: 'Drama Club - Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'day-options' },
      ]
    },
    {
      id: 'friday-activities',
      message: 'Here are activities available on Fridays:',
      options: [
        { id: 'friday-swim', text: 'Swimming Lessons - Register Now', nextNodeId: 'swimming-details' },
        { id: 'friday-music', text: 'Guitar Lessons - 3 spots left!', nextNodeId: 'guitar-details' },
        { id: 'friday-cooking', text: 'Cooking Class - Join Waitlist', nextNodeId: 'cooking-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'day-options' },
      ]
    },
    {
      id: 'weekend-activities',
      message: 'Here are activities available on weekends:',
      options: [
        { id: 'weekend-tennis', text: 'Tennis Clinic - No Registration Available', nextNodeId: 'tennis-details' },
        { id: 'weekend-yoga', text: 'Family Yoga - 4 spots left!', nextNodeId: 'family-yoga-details' },
        { id: 'weekend-art', text: 'Art Workshop - Register Now', nextNodeId: 'painting-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'day-options' },
      ]
    },
    // All activities node
    {
      id: 'all-activities',
      message: 'Here are all available activities:',
      options: [
        { id: 'all-soccer', text: 'Youth Soccer - 5 spots left!', nextNodeId: 'soccer-details' },
        { id: 'all-swim', text: 'Swimming Lessons - Register Now', nextNodeId: 'swimming-details' },
        { id: 'all-basketball', text: 'Basketball Camp - Join Waitlist', nextNodeId: 'basketball-details' },
        { id: 'all-tennis', text: 'Tennis Clinic - No Registration Available', nextNodeId: 'tennis-details' },
        { id: 'all-painting', text: 'Painting Workshop - Register Now', nextNodeId: 'painting-details' },
        { id: 'all-pottery', text: 'Pottery Class - 2 spots left!', nextNodeId: 'pottery-details' },
        { id: 'all-crafts', text: 'Kids Art - Register Now', nextNodeId: 'crafts-details' },
        { id: 'all-piano', text: 'Piano Lessons - Register Now', nextNodeId: 'piano-details' },
        { id: 'all-ballet', text: 'Ballet Classes - Join Waitlist', nextNodeId: 'ballet-details' },
        { id: 'all-guitar', text: 'Guitar Lessons - 3 spots left!', nextNodeId: 'guitar-details' },
        { id: 'all-camp', text: 'Summer Day Camp - Register Now', nextNodeId: 'summer-camp-details' },
        { id: 'all-yoga', text: 'Family Yoga - 4 spots left!', nextNodeId: 'family-yoga-details' },
        { id: 'all-cooking', text: 'Kids Cooking Class - Join Waitlist', nextNodeId: 'cooking-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'welcome' },
      ]
    },
    // Age group activity nodes
    {
      id: 'toddler-activities',
      message: 'Here are activities for toddlers (0-3 years):',
      options: [
        { id: 'toddler-music', text: 'Toddler Music & Movement - Register Now', nextNodeId: 'toddler-music-details' },
        { id: 'toddler-swim', text: 'Parent & Tot Swimming - 4 spots left!', nextNodeId: 'toddler-swim-details' },
        { id: 'toddler-art', text: 'Tiny Tots Art - Register Now', nextNodeId: 'toddler-art-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'age-options' },
      ]
    },
    {
      id: 'preschool-activities',
      message: 'Here are activities for preschoolers (3-5 years):',
      options: [
        { id: 'preschool-sports', text: 'Preschool Sports - Register Now', nextNodeId: 'preschool-sports-details' },
        { id: 'preschool-dance', text: 'Creative Movement - 2 spots left!', nextNodeId: 'preschool-dance-details' },
        { id: 'preschool-art', text: 'Preschool Art - Register Now', nextNodeId: 'preschool-art-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'age-options' },
      ]
    },
    {
      id: 'children-activities',
      message: 'Here are activities for children (6-12 years):',
      options: [
        { id: 'children-soccer', text: 'Youth Soccer - 5 spots left!', nextNodeId: 'soccer-details' },
        { id: 'children-swim', text: 'Swimming Lessons - Register Now', nextNodeId: 'swimming-details' },
        { id: 'children-art', text: 'Kids Art - Register Now', nextNodeId: 'crafts-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'age-options' },
      ]
    },
    {
      id: 'teen-activities',
      message: 'Here are activities for teens (13-18 years):',
      options: [
        { id: 'teen-basketball', text: 'Basketball Camp - Join Waitlist', nextNodeId: 'basketball-details' },
        { id: 'teen-guitar', text: 'Guitar Lessons - 3 spots left!', nextNodeId: 'guitar-details' },
        { id: 'teen-pottery', text: 'Pottery Class - 2 spots left!', nextNodeId: 'pottery-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'age-options' },
      ]
    },
    {
      id: 'adult-activities',
      message: 'Here are activities for adults (18+):',
      options: [
        { id: 'adult-yoga', text: 'Adult Yoga - Register Now', nextNodeId: 'adult-yoga-details' },
        { id: 'adult-painting', text: 'Painting Workshop - Register Now', nextNodeId: 'painting-details' },
        { id: 'adult-tennis', text: 'Tennis Clinic - No Registration Available', nextNodeId: 'tennis-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'age-options' },
      ]
    },
    {
      id: 'senior-activities',
      message: 'Here are activities for seniors (55+):',
      options: [
        { id: 'senior-yoga', text: 'Senior Yoga - Register Now', nextNodeId: 'senior-yoga-details' },
        { id: 'senior-art', text: 'Senior Art Class - 5 spots left!', nextNodeId: 'senior-art-details' },
        { id: 'senior-swim', text: 'Senior Swim - Register Now', nextNodeId: 'senior-swim-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'age-options' },
      ]
    },
    
    // Location activity nodes
    {
      id: 'downtown-activities',
      message: 'Here are activities in Downtown:',
      options: [
        { id: 'downtown-yoga', text: 'Adult Yoga - Register Now', nextNodeId: 'adult-yoga-details' },
        { id: 'downtown-art', text: 'Painting Workshop - Register Now', nextNodeId: 'painting-details' },
        { id: 'downtown-music', text: 'Piano Lessons - Register Now', nextNodeId: 'piano-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'location-options' },
      ]
    },
    {
      id: 'north-activities',
      message: 'Here are activities in the North End:',
      options: [
        { id: 'north-soccer', text: 'Youth Soccer - 5 spots left!', nextNodeId: 'soccer-details' },
        { id: 'north-swim', text: 'Swimming Lessons - Register Now', nextNodeId: 'swimming-details' },
        { id: 'north-tennis', text: 'Tennis Clinic - No Registration Available', nextNodeId: 'tennis-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'location-options' },
      ]
    },
    {
      id: 'south-activities',
      message: 'Here are activities in the South End:',
      options: [
        { id: 'south-basketball', text: 'Basketball Camp - Join Waitlist', nextNodeId: 'basketball-details' },
        { id: 'south-pottery', text: 'Pottery Class - 2 spots left!', nextNodeId: 'pottery-details' },
        { id: 'south-cooking', text: 'Kids Cooking Class - Join Waitlist', nextNodeId: 'cooking-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'location-options' },
      ]
    },
    {
      id: 'east-activities',
      message: 'Here are activities in the East Side:',
      options: [
        { id: 'east-dance', text: 'Ballet Classes - Join Waitlist', nextNodeId: 'ballet-details' },
        { id: 'east-art', text: 'Kids Art - Register Now', nextNodeId: 'crafts-details' },
        { id: 'east-yoga', text: 'Family Yoga - 4 spots left!', nextNodeId: 'family-yoga-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'location-options' },
      ]
    },
    {
      id: 'west-activities',
      message: 'Here are activities in the West Side:',
      options: [
        { id: 'west-guitar', text: 'Guitar Lessons - 3 spots left!', nextNodeId: 'guitar-details' },
        { id: 'west-camp', text: 'Summer Day Camp - Register Now', nextNodeId: 'summer-camp-details' },
        { id: 'west-swim', text: 'Swimming Lessons - Register Now', nextNodeId: 'swimming-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'location-options' },
      ]
    },
    
    // Status activity nodes
    {
      id: 'open-activities',
      message: 'Here are activities open for registration:',
      options: [
        { id: 'open-swim', text: 'Swimming Lessons - Register Now', nextNodeId: 'swimming-details' },
        { id: 'open-art', text: 'Painting Workshop - Register Now', nextNodeId: 'painting-details' },
        { id: 'open-piano', text: 'Piano Lessons - Register Now', nextNodeId: 'piano-details' },
        { id: 'open-camp', text: 'Summer Day Camp - Register Now', nextNodeId: 'summer-camp-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'status-options' },
      ]
    },
    {
      id: 'waitlist-activities',
      message: 'Here are activities with waitlists available:',
      options: [
        { id: 'waitlist-basketball', text: 'Basketball Camp - Join Waitlist', nextNodeId: 'basketball-details' },
        { id: 'waitlist-ballet', text: 'Ballet Classes - Join Waitlist', nextNodeId: 'ballet-details' },
        { id: 'waitlist-cooking', text: 'Kids Cooking Class - Join Waitlist', nextNodeId: 'cooking-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'status-options' },
      ]
    },
    {
      id: 'limited-activities',
      message: 'Here are activities with limited spots:',
      options: [
        { id: 'limited-soccer', text: 'Youth Soccer - 5 spots left!', nextNodeId: 'soccer-details' },
        { id: 'limited-pottery', text: 'Pottery Class - 2 spots left!', nextNodeId: 'pottery-details' },
        { id: 'limited-guitar', text: 'Guitar Lessons - 3 spots left!', nextNodeId: 'guitar-details' },
        { id: 'limited-yoga', text: 'Family Yoga - 4 spots left!', nextNodeId: 'family-yoga-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'status-options' },
      ]
    },
    
    // Price activity nodes
    {
      id: 'free-activities',
      message: 'Here are free activities:',
      options: [
        { id: 'free-chess', text: 'Chess Club - Register Now', nextNodeId: 'endpoint' },
        { id: 'free-art', text: 'Community Art Day - Register Now', nextNodeId: 'endpoint' },
        { id: 'free-sports', text: 'Open Gym - Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'price-options' },
      ]
    },
    {
      id: 'low-price-activities',
      message: 'Here are activities under $50:',
      options: [
        { id: 'low-art', text: 'Kids Art - Register Now', nextNodeId: 'crafts-details' },
        { id: 'low-yoga', text: 'Family Yoga - 4 spots left!', nextNodeId: 'family-yoga-details' },
        { id: 'low-chess', text: 'Chess Club - Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'price-options' },
      ]
    },
    {
      id: 'medium-price-activities',
      message: 'Here are activities between $50-$100:',
      options: [
        { id: 'medium-soccer', text: 'Youth Soccer - 5 spots left!', nextNodeId: 'soccer-details' },
        { id: 'medium-pottery', text: 'Pottery Class - 2 spots left!', nextNodeId: 'pottery-details' },
        { id: 'medium-painting', text: 'Painting Workshop - Register Now', nextNodeId: 'painting-details' },
        { id: 'medium-cooking', text: 'Kids Cooking Class - Join Waitlist', nextNodeId: 'cooking-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'price-options' },
      ]
    },
    {
      id: 'high-price-activities',
      message: 'Here are activities over $100:',
      options: [
        { id: 'high-swim', text: 'Swimming Lessons - Register Now', nextNodeId: 'swimming-details' },
        { id: 'high-piano', text: 'Piano Lessons - Register Now', nextNodeId: 'piano-details' },
        { id: 'high-guitar', text: 'Guitar Lessons - 3 spots left!', nextNodeId: 'guitar-details' },
        { id: 'high-camp', text: 'Summer Day Camp - Register Now', nextNodeId: 'summer-camp-details' },
        { id: 'high-basketball', text: 'Basketball Camp - Join Waitlist', nextNodeId: 'basketball-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'price-options' },
      ]
    },
    
    // Language activity nodes
    {
      id: 'english-activities',
      message: 'Here are activities in English:',
      options: [
        { id: 'english-soccer', text: 'Youth Soccer - 5 spots left!', nextNodeId: 'soccer-details' },
        { id: 'english-swim', text: 'Swimming Lessons - Register Now', nextNodeId: 'swimming-details' },
        { id: 'english-art', text: 'Painting Workshop - Register Now', nextNodeId: 'painting-details' },
        { id: 'english-camp', text: 'Summer Day Camp - Register Now', nextNodeId: 'summer-camp-details' },
        { id: 'back', text: 'Go Back', nextNodeId: 'language-options' },
      ]
    },
    {
      id: 'french-activities',
      message: 'Here are activities in French:',
      options: [
        { id: 'french-art', text: 'French Art Class - Register Now', nextNodeId: 'endpoint' },
        { id: 'french-cooking', text: 'French Cooking - Join Waitlist', nextNodeId: 'endpoint' },
        { id: 'french-music', text: 'French Music Lessons - Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'language-options' },
      ]
    },
    {
      id: 'spanish-activities',
      message: 'Here are activities in Spanish:',
      options: [
        { id: 'spanish-dance', text: 'Spanish Dance - Register Now', nextNodeId: 'endpoint' },
        { id: 'spanish-art', text: 'Spanish Art Class - 3 spots left!', nextNodeId: 'endpoint' },
        { id: 'spanish-music', text: 'Spanish Music - Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'language-options' },
      ]
    },
    {
      id: 'mandarin-activities',
      message: 'Here are activities in Mandarin:',
      options: [
        { id: 'mandarin-art', text: 'Mandarin Art Class - Register Now', nextNodeId: 'endpoint' },
        { id: 'mandarin-music', text: 'Mandarin Music - 2 spots left!', nextNodeId: 'endpoint' },
        { id: 'mandarin-camp', text: 'Mandarin Summer Camp - Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'language-options' },
      ]
    },
    
    // Additional activity detail nodes
    {
      id: 'toddler-music-details',
      message: 'Toddler Music & Movement\n\nAge Group: 0-3 years\nLocation: Community Center\nDays: Tuesdays and Thursdays\nTime: 10:00 AM - 10:45 AM\nPrice: $45\nSpots Available: 10\n\nA fun music and movement class for toddlers and their caregivers. Explore rhythm, songs, and simple instruments.',
      options: [
        { id: 'register', text: 'Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'toddler-activities' },
      ]
    },
    {
      id: 'toddler-swim-details',
      message: 'Parent & Tot Swimming\n\nAge Group: 6 months-3 years\nLocation: Community Center Pool\nDays: Saturdays\nTime: 9:00 AM - 9:30 AM\nPrice: $60\nSpots Available: 4\n\nA water introduction class for toddlers and their parents. Learn water safety and build comfort in the water.',
      options: [
        { id: 'register', text: 'Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'toddler-activities' },
      ]
    },
    {
      id: 'toddler-art-details',
      message: 'Tiny Tots Art\n\nAge Group: 2-3 years\nLocation: Community Center Art Room\nDays: Wednesdays\nTime: 10:00 AM - 10:45 AM\nPrice: $40\nSpots Available: 8\n\nA sensory art experience for toddlers. Explore colors, textures, and simple crafts with parent participation.',
      options: [
        { id: 'register', text: 'Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'toddler-activities' },
      ]
    },
    {
      id: 'adult-yoga-details',
      message: 'Adult Yoga\n\nAge Group: 18+\nLocation: Recreation Center Studio\nDays: Mondays, Wednesdays, and Fridays\nTime: 6:00 PM - 7:00 PM\nPrice: $75\nSpots Available: 15\n\nA balanced yoga class for all levels. Focus on strength, flexibility, and mindfulness.',
      options: [
        { id: 'register', text: 'Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'adult-activities' },
      ]
    },
    {
      id: 'senior-yoga-details',
      message: 'Senior Yoga\n\nAge Group: 55+\nLocation: Recreation Center Studio\nDays: Tuesdays and Thursdays\nTime: 10:00 AM - 11:00 AM\nPrice: $60\nSpots Available: 12\n\nA gentle yoga class designed for seniors. Focus on balance, flexibility, and relaxation.',
      options: [
        { id: 'register', text: 'Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'senior-activities' },
      ]
    },
    {
      id: 'senior-art-details',
      message: 'Senior Art Class\n\nAge Group: 55+\nLocation: Community Center Art Room\nDays: Fridays\nTime: 1:00 PM - 3:00 PM\nPrice: $70\nSpots Available: 5\n\nAn art class for seniors exploring various mediums and techniques. All skill levels welcome.',
      options: [
        { id: 'register', text: 'Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'senior-activities' },
      ]
    },
    {
      id: 'senior-swim-details',
      message: 'Senior Swim\n\nAge Group: 55+\nLocation: Community Center Pool\nDays: Mondays, Wednesdays, and Fridays\nTime: 8:00 AM - 9:00 AM\nPrice: $55\nSpots Available: 20\n\nA dedicated swim time for seniors. Includes lane swimming and water aerobics options.',
      options: [
        { id: 'register', text: 'Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'senior-activities' },
      ]
    },
    {
      id: 'preschool-sports-details',
      message: 'Preschool Sports\n\nAge Group: 3-5 years\nLocation: Community Center Gym\nDays: Saturdays\nTime: 9:00 AM - 10:00 AM\nPrice: $50\nSpots Available: 12\n\nAn introduction to various sports and physical activities designed for preschoolers.',
      options: [
        { id: 'register', text: 'Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'preschool-activities' },
      ]
    },
    {
      id: 'preschool-dance-details',
      message: 'Creative Movement\n\nAge Group: 3-5 years\nLocation: Dance Studio\nDays: Tuesdays\nTime: 3:30 PM - 4:15 PM\nPrice: $55\nSpots Available: 2\n\nA creative dance class for preschoolers exploring movement, rhythm, and self-expression.',
      options: [
        { id: 'register', text: 'Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'preschool-activities' },
      ]
    },
    {
      id: 'preschool-art-details',
      message: 'Preschool Art\n\nAge Group: 3-5 years\nLocation: Community Center Art Room\nDays: Thursdays\nTime: 3:30 PM - 4:30 PM\nPrice: $45\nSpots Available: 10\n\nAn art class designed for preschoolers to explore colors, shapes, and creativity.',
      options: [
        { id: 'register', text: 'Register Now', nextNodeId: 'endpoint' },
        { id: 'back', text: 'Go Back', nextNodeId: 'preschool-activities' },
      ]
    },
    // Endpoint node
    {
      id: 'endpoint',
      message: 'Thank you for your interest! To complete your registration, we\'ll redirect you to our secure registration portal.',
      options: [
        { id: 'new-search', text: 'Start New Search', nextNodeId: 'welcome' },
      ],
      isEndpoint: true
    }
  ];

  // Find current node
  const currentNode = conversationTree.find(node => node.id === currentNodeId);

  // Initialize with welcome message
  useEffect(() => {
    if (conversationHistory.length === 0 && currentNode) {
      setConversationHistory([{ message: currentNode.message, isUser: false }]);
    }
  }, [conversationHistory.length, currentNode]);

  // Handle option selection
  const handleOptionSelect = (nextNodeId: string, optionText: string) => {
    // Add user message to history
    setConversationHistory(prev => [...prev, { message: optionText, isUser: true }]);
    
    // Simulate typing
    setIsTyping(true);
    setTimeout(() => {
      const nextNode = conversationTree.find(node => node.id === nextNodeId);
      if (nextNode) {
        // Add bot response to history
        setConversationHistory(prev => [...prev, { message: nextNode.message, isUser: false }]);
        // Update current node
        setCurrentNodeId(nextNodeId);
        
        // Scroll to bottom after updating
        if (chatContainerRef.current) {
          setTimeout(() => {
            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
          }, 100);
        }
      } else {
        console.error(`Node with ID ${nextNodeId} not found`);
      }
      setIsTyping(false);
    }, 1000);
  };

  // Handle clearing the chat
  const handleClearChat = () => {
    setConversationHistory([]);
    setCurrentNodeId('welcome');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Phone frame container */}
      <div className="relative w-[375px] h-[800px] bg-white rounded-[40px] shadow-xl overflow-hidden border-[12px] border-gray-900">
        {/* Notch area */}
        <div className="absolute top-0 w-full h-8 bg-gray-900 z-20">
          <div className="absolute left-1/2 top-2 w-24 h-4 bg-gray-900 rounded-full -translate-x-1/2"></div>
        </div>

        {/* Screen content */}
        <div className="relative h-full pt-8 pb-6">
          {/* Status bar */}
          <div className="px-4 py-1 flex justify-between items-center text-xs text-white bg-gray-900">
            <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <div className="flex items-center space-x-2">
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>

          {/* Main app content */}
          <div className="flex flex-col h-[calc(100%-2rem)] overflow-hidden">
            {/* Header */}
            <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <h1 className="text-lg font-semibold">Activities Finder</h1>
              <button 
                onClick={handleClearChat}
                className="p-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                aria-label="Clear chat"
              >
                <Trash2 size={20} />
              </button>
            </div>
            
            {/* Chat container */}
            <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-3 space-y-3" ref={chatContainerRef}>
                {/* Conversation history */}
                {conversationHistory.map((message, index) => (
                  <React.Fragment key={index}>
                    {/* User message */}
                    {message.isUser && (
                      <div className="flex justify-end">
                        <div className="bg-blue-500 text-white rounded-2xl p-3 max-w-[85%] shadow-sm relative">
                          <div className="absolute -right-1 top-3 w-3 h-3 bg-blue-500 transform rotate-45"></div>
                          <p className="text-sm">{message.message}</p>
                          <span className="text-xs text-blue-200 block mt-1 text-right">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Bot response */}
                    {!message.isUser && (
                      <div className="flex">
                        <div className="bg-white rounded-2xl p-3 max-w-[85%] shadow-sm relative border border-gray-100">
                          <div className="absolute -left-1 top-3 w-3 h-3 bg-white transform rotate-45 border-l border-t border-gray-200"></div>
                          <p className="text-gray-800 whitespace-pre-line">{message.message}</p>
                          
                          {/* Show image if available */}
                          {!message.isUser && (
                            <>
                              {/* For welcome message */}
                              {index === 0 && currentNodeId === 'welcome' && conversationTree.find(node => node.id === 'welcome')?.imageUrl && (
                                <div className="mt-2 rounded-lg overflow-hidden">
                                  <img 
                                    src={conversationTree.find(node => node.id === 'welcome')?.imageUrl} 
                                    alt="Activities illustration" 
                                    className="w-full h-auto max-h-40 object-cover"
                                  />
                                </div>
                              )}
                              
                              {/* For other messages */}
                              {index > 0 && (
                                <>
                                  {/* Find the node that matches this message */}
                                  {(() => {
                                    // Try to find the node by message content
                                    const matchingNode = conversationTree.find(node => node.message === message.message);
                                    if (matchingNode?.imageUrl) {
                                      return (
                                        <div className="mt-2 rounded-lg overflow-hidden">
                                          <img 
                                            src={matchingNode.imageUrl} 
                                            alt="Activities illustration" 
                                            className="w-full h-auto max-h-40 object-cover"
                                          />
                                        </div>
                                      );
                                    }
                                    return null;
                                  })()}
                                </>
                              )}
                            </>
                          )}
                          
                          <span className="text-xs text-gray-500 block mt-1 text-right">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
                
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
            <div className="p-3 bg-white border-t border-gray-200 overflow-y-auto max-h-[200px]">
              {currentNode && !isTyping && (
                <div className="grid gap-2">
                  {currentNode.options.map((option) => (
                    <button
                      key={option.id}
                      className={`w-full text-left p-3 rounded-xl flex items-center transition-all active:scale-95 ${
                        option.text.includes('No Registration Available') 
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                          : option.text.includes('Register Now') 
                            ? 'bg-green-100 hover:bg-green-200 text-green-800' 
                            : option.text.includes('Join Waitlist') 
                              ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
                              : option.text.includes('spots left!')
                                ? 'bg-red-50 hover:bg-red-100 text-red-800 border border-red-200'
                              : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
                      }`}
                      onClick={() => option.text.includes('No Registration Available') ? null : handleOptionSelect(option.nextNodeId, option.text)}
                      disabled={option.text.includes('No Registration Available')}
                    >
                      {option.text.includes('Go Back') && <ChevronLeft className="mr-2 h-4 w-4" />}
                      {option.text.includes('Register Now') && <Calendar className="mr-2 h-4 w-4 text-green-600" />}
                      {option.text.includes('Join Waitlist') && <Users className="mr-2 h-4 w-4 text-yellow-600" />}
                      {option.text.includes('spots left!') && <Clock3 className="mr-2 h-4 w-4 text-red-600" />}
                      <span className="text-sm font-medium">{option.text}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Physical buttons */}
        <div className="absolute left-0 top-1/2 h-12 w-1 bg-gray-900 rounded-r-md"></div>
        <div className="absolute right-0 top-1/3 h-12 w-1 bg-gray-900 rounded-l-md"></div>
      </div>
    </div>
  );
}

export default App;