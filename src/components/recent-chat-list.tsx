import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle } from 'lucide-react'

// This is a mock function to simulate fetching recent chats
// In a real application, this would be replaced with an actual API call
async function fetchRecentChats() {
  // Simulating an API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return [
    { id: '1', title: 'Marketing Campaign Ideas', lastUpdated: '2023-06-01' },
    { id: '2', title: 'Product Launch Strategy', lastUpdated: '2023-05-28' },
    { id: '3', title: 'Social Media Content Plan', lastUpdated: '2023-05-25' },
    // Add more mock data as needed
  ]
}

export async function RecentChatsList() {
  const recentChats = await fetchRecentChats()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recentChats.map((chat) => (
        <Link href={`/dashboard/chat/${chat.id}`} key={chat.id} className="no-underline">
          <Card className="hover:shadow-lg transition-shadow h-full relative group">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <MessageCircle className="h-5 w-5 text-gray-500" />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">{chat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Last updated: {chat.lastUpdated}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

