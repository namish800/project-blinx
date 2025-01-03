import { Suspense } from 'react'
import { ChatHero } from "@/components/chat-hero"
import { RecentChatsList } from "@/components/recent-chat-list"
import { RecentChatsListSkeleton } from "@/components/recent-chats-list-skeleton"
import { Button } from "@/components/ui/button"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ChatHero />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">Recent Chats</h2>
          <Button>Start a new chat</Button>
        </div>
        <Suspense fallback={<RecentChatsListSkeleton />}>
          <RecentChatsList />
        </Suspense>
      </div>
    </div>
  )
}

