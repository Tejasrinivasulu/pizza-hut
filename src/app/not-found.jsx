import { Button } from '@nextui-org/react';
import Link from 'next/link';
export default function NotFound() {
    return (<section className='container py-24 text-center'>
      <h1 className='text-5xl font-bold text-primary mb-4'>404</h1>
      <h2 className='text-2xl font-semibold text-white mb-4'>Page not found</h2>
      <p className='text-gray-400 mb-8'>The page you are looking for does not exist.</p>
      <Button as={Link} href='/' color='primary' className='text-dark font-semibold'>
        Back to Home
      </Button>
    </section>);
}
