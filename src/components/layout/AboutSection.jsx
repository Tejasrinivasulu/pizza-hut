import SectionHeader from '@/components/layout/SectionHeader';
const AboutSection = ({ className }) => {
    return (<section id='about' className={`scroll-mt-20 bg-gray-900/30 border-y border-gray-800/60 ${className !== null && className !== void 0 ? className : ''}`}>
      <div className='container py-16'>
        <SectionHeader header='About Us' description='Our story of passion, flavour, and the joy of great food.'/>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
          <div className='min-h-[280px] lg:min-h-[400px] rounded-2xl bg-center bg-no-repeat bg-cover border border-gray-700 shadow-xl' style={{ backgroundImage: "url('/assets/about.jpg')" }}/>
          <div className='text-gray-300 space-y-6 leading-relaxed text-lg md:text-xl'>
            <h2 className='text-3xl md:text-4xl font-bold text-white normal-case leading-snug'>
              Welcome to <span className='text-primary'>Pizza Fiesta</span>
            </h2>
            <p>
              At Pizza Fiesta, our story is a delightful journey of passion and flavor.
              It all began with a love for crafting the perfect pizza, blending tradition with innovation.
              Our chefs, inspired by the rich culinary heritage of Italy, handpick the finest ingredients
              to create mouthwatering masterpieces.
            </p>
            <p>
              From our artisanal crusts to the delectable toppings, each dish tells a tale of dedication
              and quality. With a commitment to excellence, we&apos;ve built a community that cherishes
              every bite — join us on this gastronomic adventure.
            </p>
          </div>
        </div>
      </div>
    </section>);
};
export default AboutSection;
