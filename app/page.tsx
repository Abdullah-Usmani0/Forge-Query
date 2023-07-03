'use client'
import { useState, useEffect, FormEvent } from 'react'
import { useChat } from 'ai/react'
import HighlightCode from './components/HighlightCode'
import CopyButton from './components/CopyButton';

import hljs from 'highlight.js/lib/core';

export default function Chat() {
  const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    // initialMessages: [
    //   { role: 'system', content: 'You can ask me any SQL related question.', id: 'system-init' }
    // ],
    api: '/api/sql'
  });

  const exampleInputs = [
    "what were the top selling properties?",
    "how many properties were sold last month?",
    "how many properties were sold and for how much?",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 px-4 lg:px-0">
      <div className="max-w-6xl w-full space-y-8">
        <div className="overflow-y-auto h-128 p-4 max-w-full w-full mt-5 bg-white shadow-lg rounded-xl">
          {messages.map((m: { id: string, role: string, content: string }) => (
            <div key={m.id} className={`relative flex flex-col max-w-lg mx-2 my-2 ${m.role === 'user' ? 'ml-auto' : 'mr-auto'}`}>
              <div className={`p-3 rounded-lg ${m.role === 'user' ? 'bg-blue-100 rounded-br-none' : 'bg-gray-200 rounded-bl-none'}`}>
                <p className="font-semibold">{m.role === 'user' ? 'You' : m.role === 'system' ? 'System' : 'AI'}</p>
                {m.role === 'assistant' ? (
                  <>
                    <HighlightCode content={hljs.highlight('sql', m.content).value} />
                    <CopyButton content={m.content} />
                  </>
                ) : (
                  <p>{m.content}</p>
                )}
              </div>
            </div>
          ))}

        </div>
        <div className="flex justify-between mt-8 mb-4 space-x-2">
          {exampleInputs.map((input, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleInputChange({ target: { value: input } })}
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-2 rounded-md text-center"
            >
              {input}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="chat-input" className="sr-only">Chat Input</label>
              <textarea
                required
                id="chat-input"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Ask a SQL question..."
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    let form = (e.target as HTMLElement).closest('form');
                    if (form) {
                      const event = new Event('submit', { bubbles: true, cancelable: true });
                      form.dispatchEvent(event);
                    }
                  }
                }}
                disabled={isLoading}
                rows={2} // starts off as one line
              />


            </div>
          </div>
          <button type="submit" disabled={isLoading} className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-50' : ''}`}>
            {isLoading ? (
              <>
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
                Loading...
              </>
            ) : (
              'Ask'
            )}
          </button>

        </form>
      </div>
    </div>
  )
}