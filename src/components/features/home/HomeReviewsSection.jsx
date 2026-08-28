'use client';
import SectionHeader from '@/components/layout/SectionHeader';
import { motion } from 'framer-motion';
import { useState } from 'react';
const REVIEWS = [
    { text: 'The pizza was hot and delicious. Fast delivery too! Will definitely be ordering again this weekend.', author: 'Priya S.', initials: 'PS', color: 'bg-pink-500' },
    { text: 'Best burgers and pasta in town! Will order again. The whole family loved every bite.', author: 'Rahul M.', initials: 'RM', color: 'bg-blue-500' },
    { text: 'Amazing taste and affordable prices. Highly recommend to everyone looking for great food!', author: 'Ananya K.', initials: 'AK', color: 'bg-emerald-500' },
    { text: 'Party catering was a huge hit at our office event! Professional service and delicious food.', author: 'Vikram T.', initials: 'VT', color: 'bg-violet-500' },
    { text: 'Love the dine-in experience — cozy atmosphere and the food is always fresh and flavourful.', author: 'Sneha R.', initials: 'SR', color: 'bg-orange-500' },
];
function ReviewCard({ review, onHoverStart, onHoverEnd }) {
    return (<div onMouseEnter={onHoverStart} onMouseLeave={onHoverEnd} className='relative shrink-0 w-[320px] sm:w-[380px] md:w-[420px] min-h-[210px] sm:min-h-[220px] md:min-h-[230px] rounded-2xl border border-gray-700/80 bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-6 flex flex-col justify-between hover:border-primary/50 hover:shadow-xl hover:shadow-primary/15 transition-all duration-300 cursor-default'>
      <span className='absolute top-5 right-6 text-6xl text-primary/15 font-serif leading-none'>&ldquo;</span>

      <div className='flex items-center gap-3 mb-4'>
        <div className={`w-12 h-12 rounded-full ${review.color} flex items-center justify-center text-white font-bold text-sm shrink-0 ring-2 ring-primary/30 shadow-lg`}>
          {review.initials}
        </div>
        <div>
          <p className='font-bold text-white text-lg'>{review.author}</p>
          <p className='text-yellow-400 text-base tracking-widest mt-0.5'>★★★★★</p>
        </div>
      </div>

      <p className='text-gray-300 text-base md:text-lg leading-relaxed italic flex-1'>
        &ldquo;{review.text}&rdquo;
      </p>
    </div>);
}
const HomeReviewsSection = ({ className }) => {
    const [isPaused, setIsPaused] = useState(false);
    const marqueeReviews = [...REVIEWS, ...REVIEWS];
    return (<section id='reviews' className={`scroll-mt-20 overflow-hidden ${className !== null && className !== void 0 ? className : ''}`}>
      <div className='container py-16'>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionHeader header='Customer Reviews' description='Hear what our happy customers have to say about Pizza Fiesta.'/>
        </motion.div>

        <div className='relative py-4 overflow-hidden'>
          <div className='flex gap-8 w-max items-stretch reviews-marquee' style={{ animationPlayState: isPaused ? 'paused' : 'running' }}>
            {marqueeReviews.map((review, index) => (<ReviewCard key={`${review.author}-${index}`} review={review} onHoverStart={() => setIsPaused(true)} onHoverEnd={() => setIsPaused(false)}/>))}
          </div>
        </div>
      </div>
    </section>);
};
export default HomeReviewsSection;
