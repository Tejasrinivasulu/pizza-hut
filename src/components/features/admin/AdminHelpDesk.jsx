'use client';
import Loader from '@/components/common/Loader';
import { getReadableDateTime } from '@/libs/datetime';
import { Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
const AdminHelpDesk = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [updating, setUpdating] = useState(false);
    function loadMessages() {
        return fetch('/api/contact-messages')
            .then(r => r.json())
            .then(data => {
            if (Array.isArray(data))
                setMessages(data);
        })
            .finally(() => setLoading(false));
    }
    useEffect(() => {
        loadMessages();
    }, []);
    function openMessage(msg) {
        setSelectedMessage(msg);
        setReplyText(msg.adminReply || '');
    }
    async function sendReply(messageId) {
        if (!replyText.trim()) {
            toast.error('Please enter a reply message');
            return;
        }
        setUpdating(true);
        try {
            const res = await fetch('/api/contact-messages', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messageId, adminReply: replyText.trim() }),
            });
            const data = await res.json();
            if (!res.ok)
                throw new Error(data.error);
            setMessages(prev => prev.map(m => (m._id === messageId ? data : m)));
            setSelectedMessage(data);
            toast.success('Reply sent to customer');
        }
        catch (_a) {
            toast.error('Could not send reply');
        }
        finally {
            setUpdating(false);
        }
    }
    const pendingCount = messages.filter(m => m.status === 'pending').length;
    if (loading)
        return <Loader className='py-20'/>;
    return (<div className='space-y-8'>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className='rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/15 via-gray-900/90 to-gray-900/90 p-8'>

        <h1 className='text-3xl md:text-4xl font-bold text-white normal-case mb-2'>

          💬 Help <span className='text-primary'>Desk</span>

        </h1>

        <p className='text-gray-300'>

          Reply to customer queries — your response will appear in their Help Center.

        </p>

      </motion.div>



      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>

        <div className='rounded-xl border border-gray-700 bg-gray-900/60 p-5'>

          <p className='text-gray-400 text-sm'>Total Messages</p>

          <p className='text-2xl font-bold text-primary mt-1'>{messages.length}</p>

        </div>

        <div className='rounded-xl border border-yellow-600/40 bg-yellow-500/10 p-5'>

          <p className='text-gray-400 text-sm'>Pending</p>

          <p className='text-2xl font-bold text-yellow-400 mt-1'>{pendingCount}</p>

        </div>

        <div className='rounded-xl border border-emerald-600/40 bg-emerald-500/10 p-5 col-span-2 md:col-span-1'>

          <p className='text-gray-400 text-sm'>Replied</p>

          <p className='text-2xl font-bold text-emerald-400 mt-1'>{messages.length - pendingCount}</p>

        </div>

      </div>



      <div className='rounded-2xl border border-gray-700/80 bg-gray-900/50 p-4 md:p-6 space-y-4'>

        <div className='flex items-center justify-between gap-4'>

          <h2 className='text-xl font-bold text-white normal-case'>Customer Messages</h2>

          <Button size='sm' variant='flat' className='text-primary border border-primary/40' onPress={() => loadMessages()}>

            Refresh

          </Button>

        </div>



        {messages.length === 0 ? (<p className='text-gray-400 text-center py-12 border border-gray-700 rounded-xl'>No customer messages yet.</p>) : (messages.map(msg => (<motion.div key={msg._id} whileHover={{ x: 4 }} className='rounded-xl border border-gray-700 bg-gray-900/60 p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-primary/40 transition-colors min-h-[100px]'>

              <div className='flex-1 min-w-0'>

                <div className='flex flex-wrap items-center gap-3 mb-2'>

                  <p className='font-semibold text-white text-lg'>{msg.firstName} {msg.lastName}</p>

                  <Chip size='sm' color={msg.status === 'replied' ? 'success' : 'warning'} variant='flat' className='capitalize'>

                    {msg.status === 'replied' ? 'Resolved' : 'Pending'}

                  </Chip>

                  {msg.createdAt && (<span className='text-xs text-gray-500'>{getReadableDateTime(msg.createdAt)}</span>)}

                </div>

                <p className='text-sm text-primary font-medium mb-1'>{msg.subject}</p>

                <p className='text-sm text-gray-400'>{msg.message}</p>

                {msg.adminReply && (<p className='text-sm text-emerald-400 mt-2'>Reply: {msg.adminReply}</p>)}

                <p className='text-xs text-gray-500 mt-2'>{msg.email}{msg.phoneNumber ? ` · ${msg.phoneNumber}` : ''}</p>

              </div>

              <Button size='sm' color='primary' className='text-dark font-semibold shrink-0' onPress={() => openMessage(msg)}>

                {msg.status === 'replied' ? 'View / Edit Reply' : 'Reply'}

              </Button>

            </motion.div>)))}

      </div>



      <Modal isOpen={!!selectedMessage} onClose={() => setSelectedMessage(null)} size='lg'>

        <ModalContent>

          {selectedMessage && (<>

              <ModalHeader className='flex flex-col gap-1'>

                {selectedMessage.firstName} {selectedMessage.lastName}

                <span className='text-sm font-normal text-gray-400'>{selectedMessage.email}</span>

              </ModalHeader>

              <ModalBody className='gap-4'>

                <div>

                  <p className='text-xs uppercase tracking-wide text-gray-500 mb-1'>Customer Message</p>

                  <p className='text-gray-300 leading-relaxed whitespace-pre-wrap'>{selectedMessage.message}</p>

                </div>

                <Textarea label='Your Reply to Customer' placeholder='e.g. Resolved: Please wait 5 minutes, your order is on the way.' value={replyText} onValueChange={setReplyText} minRows={3} variant='bordered'/>

                {selectedMessage.adminReply && selectedMessage.repliedAt && (<p className='text-xs text-gray-500'>Last replied: {getReadableDateTime(selectedMessage.repliedAt)}</p>)}

              </ModalBody>

              <ModalFooter>

                <Button variant='light' onPress={() => setSelectedMessage(null)}>Close</Button>

                {selectedMessage._id && (<Button color='primary' className='text-dark font-semibold' isLoading={updating} onPress={() => sendReply(selectedMessage._id)}>

                    Send Reply

                  </Button>)}

              </ModalFooter>

            </>)}

        </ModalContent>

      </Modal>

    </div>);
};
export default AdminHelpDesk;
