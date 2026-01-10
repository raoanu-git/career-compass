import { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/landing/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import { Send, Users, MessageCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  avatar: string;
  rating?: number;
}

export default function Community() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'Alice Johnson',
      text: 'Just completed my internship at Google! The interview prep resources here were incredibly helpful.',
      timestamp: new Date(Date.now() - 3600000),
      avatar: 'AJ',
      rating: 5
    },
    {
      id: '2',
      user: 'Michael Chen',
      text: 'Does anyone have tips for preparing for system design interviews? I have one coming up next week.',
      timestamp: new Date(Date.now() - 1800000),
      avatar: 'MC'
    },
    {
      id: '3',
      user: 'Sarah Williams',
      text: 'Just got accepted to my dream internship at Microsoft! Thank you to everyone who helped me prepare.',
      timestamp: new Date(Date.now() - 1200000),
      avatar: 'SW',
      rating: 5
    },
    {
      id: '4',
      user: 'David Kim',
      text: 'The resume review feature is amazing. Got multiple interview calls after updating my resume based on the feedback.',
      timestamp: new Date(Date.now() - 600000),
      avatar: 'DK',
      rating: 5
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: Date.now().toString(),
      user: user?.displayName || user?.email?.split('@')[0] || 'Anonymous User',
      text: newMessage,
      timestamp: new Date(),
      avatar: user?.displayName?.charAt(0) + (user?.displayName?.split(' ')[1]?.charAt(0) || '') || 'AU'
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Community Chat Room</h1>
          <p className="text-slate-600">Connect with other students and share your experiences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Community Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white rounded-2xl shadow-sm border border-slate-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-slate-900">Community</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Connect with fellow students and professionals to share experiences, tips, and opportunities.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Active Members</span>
                  <span className="font-bold text-slate-900">248</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl shadow-sm border border-slate-100">
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-900 mb-4">Recent Reviews</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm font-bold">
                      SJ
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Sarah J.</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">Outstanding resources!</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm font-bold">
                      DK
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">David K.</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">Great community support</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Room */}
          <div className="lg:col-span-3">
            <Card className="bg-white rounded-2xl shadow-sm border border-slate-100 h-[600px] flex flex-col">
              <div className="p-4 border-b border-slate-100">
                <h2 className="font-bold text-slate-900 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  General Discussion
                </h2>
                <p className="text-sm text-slate-600">Chat with the community about internships and experiences</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((message) => (
                  <div key={message.id} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
                      {message.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <h4 className="font-bold text-slate-900">{message.user}</h4>
                        <span className="text-xs text-slate-500">{formatTime(message.timestamp)}</span>
                      </div>
                      <p className="text-slate-700 mt-1">{message.text}</p>
                      {message.rating && (
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < message.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="h-12 border-slate-200 focus:border-blue-600 focus:ring-blue-600"
                  />
                  <Button type="submit" className="h-12 px-4 bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}