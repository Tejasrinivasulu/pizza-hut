'use client';
import { Button } from '@nextui-org/react';
import { useEffect } from 'react';
export default function Error({ error, reset, }) {
    useEffect(() => {
        console.error(error);
    }, [error]);
    return (<section className='container py-24 text-center'>
      <h1 className='text-3xl font-bold text-white mb-4'>Something went wrong</h1>
      <p className='text-gray-400 mb-8 max-w-md mx-auto'>
        An unexpected error occurred. Please try again.
      </p>
      <Button color='primary' className='text-dark font-semibold' onPress={() => reset()}>
        Try again
      </Button>
    </section>);
}
