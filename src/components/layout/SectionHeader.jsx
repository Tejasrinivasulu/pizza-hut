import React from 'react';
import DecoDivider from '../common/DecoDivider';
const SectionHeader = ({ header, description }) => {
    return (<div className='max-w-3xl mx-auto text-center mb-12 md:mb-16'>
      <h2 className='text-2xl md:text-4xl font-bold uppercase tracking-wide text-white mb-4'>
        {header}
      </h2>
      <DecoDivider className='mb-5'/>
      <p className='text-gray-400 text-base md:text-lg leading-relaxed'>{description}</p>
    </div>);
};
export default SectionHeader;
