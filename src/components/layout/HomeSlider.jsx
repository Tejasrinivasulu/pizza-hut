import { Button, Link } from '@nextui-org/react';
import SlideBackground from './SlideBackground';
import FoodImage from '@/components/common/FoodImage';
const HERO_IMAGES = {
    pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=600&fit=crop',
    burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop',
    pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=600&fit=crop',
};
const HomeSlider = ({ className }) => {
    return (<section id='hero' className={`scroll-mt-20 ${className !== null && className !== void 0 ? className : ''}`}>
      <div data-hs-carousel='{"isAutoPlay": true}' className='relative h-[520px] sm:h-[580px] md:h-[650px] lg:h-[700px] z-0'>
        <div className='hs-carousel relative overflow-hidden w-full h-full'>
          <div className='hs-carousel-body w-full absolute top-0 bottom-0 start-0 flex flex-nowrap duration-700 ease-in-out opacity-100'>

            <SlideBackground bgImage='/assets/slider_bg_1.jpg'>
              <div className='w-full flex flex-col md:flex-row gap-8 md:gap-10 justify-center items-center h-full absolute z-10 px-6 md:px-12'>
                <div className='relative shrink-0'>
                  <div className='absolute -inset-4 rounded-full bg-primary/20 blur-2xl animate-pulse'/>
                  <FoodImage src={HERO_IMAGES.pizza} alt='Delicious Pizza' className='relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full border-4 border-primary shadow-2xl shadow-primary/40 object-cover'/>
                </div>
                <div className='max-w-xl text-center md:text-left'>
                  <span className='font-nothingYouCouldDo text-primary text-3xl md:text-[40px] mb-2 block'>Welcome to</span>
                  <h1 className='mb-4 text-3xl md:text-5xl leading-tight'>
                    Your Favourite <span className='text-primary'>Pizza</span> Recipe
                  </h1>
                  <h3 className='mb-8 text-gray-300 text-base md:text-lg leading-relaxed'>
                    Freshly baked with the finest ingredients — delivered hot to your doorstep in minutes.
                  </h3>
                  <div className='flex flex-wrap gap-3 justify-center md:justify-start'>
                    <Button as={Link} href='/menu' color='primary' radius='full' size='lg' className='px-8 font-bold text-dark'>
                      Order Now
                    </Button>
                    <Button as={Link} href='/menu' radius='full' size='lg' variant='bordered' className='border-primary text-primary px-8'>
                      View Menu
                    </Button>
                  </div>
                </div>
              </div>
            </SlideBackground>

            <SlideBackground bgImage='/assets/slider_bg_2.jpg'>
              <div className='w-full flex flex-col md:flex-row gap-8 md:gap-10 justify-center items-center h-full absolute z-10 px-6 md:px-12'>
                <div className='relative shrink-0 order-1 md:order-none'>
                  <div className='absolute -inset-4 rounded-full bg-primary/20 blur-2xl'/>
                  <FoodImage src={HERO_IMAGES.burger} alt='Crispy Burger' className='relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full border-4 border-primary shadow-2xl shadow-primary/40 object-cover'/>
                </div>
                <div className='max-w-xl text-center md:text-left'>
                  <span className='font-nothingYouCouldDo text-primary text-3xl md:text-[40px] mb-2 block'>Crunchy</span>
                  <h1 className='mb-4 text-3xl md:text-5xl'>Stacked <span className='text-primary'>Burgers</span></h1>
                  <h3 className='mb-8 text-gray-300 text-base md:text-lg'>
                    Premium patties, melted cheese, and fresh toppings in every bite.
                  </h3>
                  <div className='flex flex-wrap gap-3 justify-center md:justify-start'>
                    <Button as={Link} href='/menu?category=Burgers' color='primary' radius='full' size='lg' className='px-8 font-bold text-dark'>
                      Order Burgers
                    </Button>
                    <Button as={Link} href='/menu' radius='full' size='lg' variant='bordered' className='border-primary text-primary px-8'>
                      Full Menu
                    </Button>
                  </div>
                </div>
              </div>
            </SlideBackground>

            <SlideBackground bgImage='/assets/slider_bg_2.jpg'>
              <div className='w-full flex flex-col md:flex-row-reverse gap-8 md:gap-10 justify-center items-center h-full absolute z-10 px-6 md:px-12'>
                <div className='relative shrink-0'>
                  <div className='absolute -inset-4 rounded-full bg-primary/20 blur-2xl'/>
                  <FoodImage src={HERO_IMAGES.pasta} alt='Creamy Pasta' className='relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full border-4 border-primary shadow-2xl shadow-primary/40 object-cover'/>
                </div>
                <div className='max-w-xl text-center md:text-right'>
                  <span className='font-nothingYouCouldDo text-primary text-3xl md:text-[40px] mb-2 block'>Delicious</span>
                  <h1 className='mb-4 text-3xl md:text-5xl'>Creamy <span className='text-primary'>Pasta</span></h1>
                  <h3 className='mb-8 text-gray-300 text-base md:text-lg'>
                    Authentic Italian recipes with rich sauces and fresh herbs.
                  </h3>
                  <div className='flex flex-wrap gap-3 justify-center md:justify-end'>
                    <Button as={Link} href='/menu?category=Pasta' color='primary' radius='full' size='lg' className='px-8 font-bold text-dark'>
                      Order Pasta
                    </Button>
                    <Button as={Link} href='/menu' radius='full' size='lg' variant='bordered' className='border-primary text-primary px-8'>
                      Explore All
                    </Button>
                  </div>
                </div>
              </div>
            </SlideBackground>
          </div>
        </div>

        <div className='hs-carousel-pagination flex justify-center absolute bottom-5 start-0 end-0 space-x-3'>
          {[0, 1, 2].map(i => (<span key={i} className='hs-carousel-active:bg-primary hs-carousel-active:border-primary w-3 h-3 border-2 border-gray-500 rounded-full cursor-pointer transition-colors'/>))}
        </div>
      </div>
    </section>);
};
export default HomeSlider;
