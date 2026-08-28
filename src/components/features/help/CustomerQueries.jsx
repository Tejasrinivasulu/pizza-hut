'use client';
import { getReadableDateTime } from '@/libs/datetime';
import { Chip } from '@nextui-org/react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
const CustomerQueries = () => {
    const { status } = useSession();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadMessages = useCallback(() => {
        if (status !== 'authenticated')
            return;
        setLoading(true);
        fetch('/api/contact-messages')
            .then(r => r.json())
            .then(data => {
            if (Array.isArray(data))
                setMessages(data);
        })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [status]);
    useEffect(() => {
        loadMessages();
        const handler = () => loadMessages();
        window.addEventListener('contact-message-sent', handler);
        return () => window.removeEventListener('contact-message-sent', handler);
    }, [loadMessages]);
    if (status === 'unauthenticated') {
        return (<div className='mb-16 rounded-2xl border border-gray-700 bg-gray-900/40 p-8 text-center max-w-3xl mx-auto'>
        <h2 className='text-2xl font-semibold text-primary mb-2'>My Queries</h2>
        <p className='text-gray-400 mb-4'>Log in to view your inquiries and admin replies.</p>
        <Link href='/login' className='text-primary font-semibold hover:underline'>
          Login to view My Queries
        </Link>
      </div>);
    }
    return (<div className='mb-16'>
      <div className='text-center mb-8'>
        <h2 className='text-2xl font-semibold text-primary'>My Queries</h2>
        <p className='text-gray-400 mt-2'>
          Your inquiries are saved here. Status shows Pending until admin replies.
        </p>
      </div>

      {loading ? (<p className='text-gray-400 text-center py-8'>Loading your queries...</p>) : messages.length === 0 ? (<div className='rounded-2xl border border-dashed border-gray-600 bg-gray-900/30 p-10 text-center max-w-3xl mx-auto'>
          <p className='text-gray-400'>No inquiries yet. Send a message below and it will appear here.</p>
        </div>) : (<div className='space-y-4 max-w-3xl mx-auto'>
          {messages.map(msg => (<div key={msg._id} className='rounded-2xl border border-gray-700 bg-gray-900/50 p-6 space-y-4'>
              <div className='flex flex-wrap items-center gap-3'>
                <Chip size='sm' color={msg.status === 'replied' ? 'success' : 'warning'} variant='flat' className='capitalize font-semibold'>
                  {msg.status === 'replied' ? 'Resolved' : 'Pending'}
                </Chip>
                {msg.subject && (<span className='text-sm text-primary font-medium'>{msg.subject}</span>)}
                {msg.createdAt && (<span className='text-xs text-gray-500'>{getReadableDateTime(msg.createdAt)}</span>)}
              </div>

              <div className='rounded-xl bg-gray-800/60 border border-gray-700 p-4'>
                <p className='text-xs uppercase tracking-wide text-gray-500 mb-2'>Your Inquiry</p>
                <p className='text-gray-200 leading-relaxed'>{msg.message}</p>
              </div>

              {msg.adminReply ? (<div className='rounded-xl bg-emerald-500/10 border border-emerald-500/40 p-4'>
                  <p className='text-xs uppercase tracking-wide text-emerald-400 font-semibold mb-2'>
                    Admin Response
                  </p>
                  <p className='text-emerald-100 font-medium text-base'>
                    Resolved: {msg.adminReply}
                  </p>
                  {msg.repliedAt && (<p className='text-xs text-gray-500 mt-2'>Replied on {getReadableDateTime(msg.repliedAt)}</p>)}
                </div>) : (<p className='text-sm text-yellow-500/80 italic pl-1'>
                  Waiting for admin response...
                </p>)}
            </div>))}
        </div>)}
    </div>);
};
export default CustomerQueries;
