import Link from 'next/link';
const AuthPageLayout = ({ title, subtitle, children, footerText, footerLinkText, footerLinkHref, }) => {
    return (<section className='auth-screen fixed inset-0 flex items-center justify-center px-4 overflow-hidden'>
      <div className='w-full max-w-sm'>
        <div className='text-center mb-4'>
          <Link href='/' className='inline-block text-2xl font-bold text-primary italic hover:opacity-90'>
            Pizza Fiesta
          </Link>
          <h1 className='text-2xl font-bold text-white normal-case mt-2'>{title}</h1>
          <p className='text-gray-400 mt-1 text-xs'>{subtitle}</p>
        </div>

        <div className='rounded-2xl border border-primary/30 bg-gray-900/80 p-5 shadow-xl shadow-black/20'>
          {children}
          <p className='text-center mt-4 pt-4 border-t border-gray-700/80 text-gray-400 text-xs'>
            {footerText}{' '}
            <Link href={footerLinkHref} className='text-primary font-semibold hover:underline'>
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </section>);
};
export default AuthPageLayout;
