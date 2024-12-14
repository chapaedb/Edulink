import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Message, Session } from '../../types';
import { messages, sessions } from '../../lib/api';

export default function Messages() {
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userSessions, setUserSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await sessions.list();
        setUserSessions(response.sessions);
        if (response.sessions.length > 0) {
          setActiveSession(response.sessions[0]);
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeSession) return;
      try {
        const response = await messages.list(activeSession._id);
        setMessageList(response);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [activeSession]);

  const handleSendMessage = async () => {
    if (!activeSession || !newMessage.trim()) return;

    try {
      const response = await messages.send({
        sessionId: activeSession._id,
        content: newMessage,
      });
      setMessageList([...messageList, response]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        
        <div className="mt-8 grid gap-6 lg:grid-cols-4">
          {/* Sessions List */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Active Sessions</h2>
                <div className="space-y-2">
                  {userSessions.map((session) => (
                    <button
                      key={session._id}
                      onClick={() => setActiveSession(session)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeSession?._id === session._id
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <p className="font-medium">{session.courseId.title}</p>
                      <p className="text-sm text-gray-500">
                        with {session.tutorId.name}
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Messages */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardContent className="flex-1 p-4 overflow-y-auto">
                {messageList.map((message) => (
                  <div
                    key={message._id}
                    className={`mb-4 flex ${
                      message.senderId === 'currentUser'
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.senderId === 'currentUser'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}