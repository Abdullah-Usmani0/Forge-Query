'use client'
//NOTE: WORK IN PROGRESS. INCOMPLETE. DO NOT USE.

import { useChat } from 'ai/react'
import { useEffect, useRef } from 'react'
import data from "./system-prompts.json"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      { role: 'system', content: data[0].system, id: 'system-init' },
      { role: 'assistant', content: 'How can I help you today?', id: 'ai-init' },
    ],
    api: '/api/streaming',
  })

  // Create a new ref
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Scroll into view every time a new message is added
  useEffect(() => {
    if(bottomRef.current) {
      bottomRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <div className="flex flex-col bg-white rounded shadow-lg p-6 w-full sm:w-3/4 lg:w-1/2 max-h-full overflow-y-auto scrollbar-custom">
        {messages.map((m, i) => {
          // Skip if the message role is 'system'
          if (m.role === 'system') return null;

          return (
            <div key={m.id} className={`flex items-start ${m.role === 'user' ? 'justify-end' : ''} mb-2`}>
              <div className={`flex flex-col items-center ${m.role === 'user' ? 'items-end' : ''}`}>
                <div className="text-xs text-gray-600 mb-1">
                  {m.role === 'user' ? 'You' : 'AI'}
                </div>
                <div className={`px-4 py-2 rounded-lg max-w-full overflow-auto break-all ${m.role === 'user' ? 'bg-gray-300' : 'bg-gray-200'}`}>
                  {m.content}
                </div>
              </div>
            </div>
          );
        })}
        {/* Add the ref at the bottom of the message list */}
        <div ref={bottomRef}></div>
      </div>

      <form onSubmit={handleSubmit} className="w-full sm:w-3/4 lg:w-1/2 mt-4">
        <div className="flex justify-between items-center bg-white rounded shadow-lg p-4">
          <input
            className="w-full border-none focus:outline-none"
            placeholder="Type your message here..."
            value={input}
            onChange={handleInputChange}
          />
          <button type="submit" className="ml-4 px-6 py-2 rounded bg-black text-white text-sm">Send</button>
        </div>
      </form>
    </div>
  )
}
