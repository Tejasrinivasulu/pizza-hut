'use client';
import { Accordion, AccordionItem } from '@nextui-org/react';
const FAQ_ITEMS = [
    {
        question: 'How do I track my order?',
        answer: 'Log in to your account and go to My Orders. You will see your order status — pending, accepted, preparing, out for delivery, or delivered — updated in real time.',
    },
    {
        question: 'What are your delivery hours?',
        answer: 'We deliver Monday to Friday from 8:00 AM to 9:00 PM. Weekend hours may vary by location. You can place orders anytime; delivery is fulfilled during operating hours.',
    },
    {
        question: 'Can I change or cancel my order?',
        answer: 'You can request a change or cancellation within a few minutes of placing your order. Contact Customer Care immediately by phone or the message form. Once preparation has started, changes may not be possible.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept Cash on Delivery (COD) and online payments including UPI, credit card, and debit card through our secure checkout.',
    },
    {
        question: 'Is cash on delivery available?',
        answer: 'Yes. Select Cash on Delivery at checkout and pay the delivery person when your order arrives. Please keep exact change ready when possible.',
    },
    {
        question: 'What is the delivery fee?',
        answer: 'A flat delivery fee of ₹40 applies to all orders. Taxes (GST 5%) are calculated on the subtotal and shown clearly before you confirm your order.',
    },
    {
        question: 'How long does delivery take?',
        answer: 'Most orders are delivered within 25–30 minutes depending on your location, order size, and kitchen load. You will see an estimated time after placing your order.',
    },
    {
        question: 'Do I need an account to place an order?',
        answer: 'Yes. You need to register and log in to add items to your cart and complete checkout. This helps us save your delivery address and order history.',
    },
    {
        question: 'What if my order is wrong or missing items?',
        answer: 'We are sorry for the inconvenience. Contact Customer Care within 24 hours with your order number and details. We will verify and arrange a replacement or refund where applicable.',
    },
    {
        question: 'Do you offer refunds?',
        answer: 'Refunds are issued for valid complaints such as wrong items, missing items, or undelivered orders. Online payments are refunded to the original payment method within 5–7 business days.',
    },
    {
        question: 'Can I schedule an order for later?',
        answer: 'Currently we process orders for immediate delivery. Scheduled ordering may be added soon. For special requests, contact us before placing your order.',
    },
    {
        question: 'Which areas do you deliver to?',
        answer: 'We deliver across Malvern and nearby areas. Enter your full address at checkout to confirm availability. If delivery is unavailable, you will be notified before payment.',
    },
];
const HelpCenterFaq = () => {
    return (<Accordion variant='bordered' selectionMode='multiple' className='gap-3' itemClasses={{
            base: 'bg-gray-900/40 border-gray-700 px-4',
            title: 'font-semibold text-white',
            content: 'text-gray-400 text-sm pb-4',
            trigger: 'py-4',
        }}>
      {FAQ_ITEMS.map((item, index) => (<AccordionItem key={item.question} aria-label={item.question} title={<span>
              <span className='text-primary mr-2'>{String(index + 1).padStart(2, '0')}.</span>
              {item.question}
            </span>}>
          {item.answer}
        </AccordionItem>))}
    </Accordion>);
};
export default HelpCenterFaq;
