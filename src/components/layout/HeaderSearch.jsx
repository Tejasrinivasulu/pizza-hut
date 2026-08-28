'use client';
import FoodImage from '@/components/common/FoodImage';
import { SearchIcon } from '@/icons/SearchIcon';
import { formatPrice } from '@/libs/currency';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
function filterMenuItems(items, query) {
    const term = query.trim().toLowerCase();
    if (!term)
        return [];
    return items.filter(item => {
        var _a, _b;
        return item.name.toLowerCase().includes(term) ||
            ((_b = (_a = item.description) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(term)) !== null && _b !== void 0 ? _b : false);
    });
}
const HeaderSearch = () => {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const wrapperRef = useRef(null);
    useEffect(() => {
        fetch('/api/menu-items')
            .then(res => res.json())
            .then(data => {
            if (Array.isArray(data))
                setMenuItems(data);
        });
    }, []);
    useEffect(() => {
        function handleClickOutside(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const results = useMemo(() => filterMenuItems(menuItems, query).slice(0, 6), [menuItems, query]);
    function goToSearch(searchTerm) {
        const trimmed = searchTerm.trim();
        if (!trimmed)
            return;
        setOpen(false);
        router.push(`/menu?search=${encodeURIComponent(trimmed)}`);
    }
    function handleSubmit(e) {
        e.preventDefault();
        goToSearch(query);
    }
    return (<div ref={wrapperRef} className='relative'>
      <form onSubmit={handleSubmit} className='flex items-center'>
        <div className='flex items-center h-9 rounded-full border-2 border-primary/60 bg-black/60 overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 transition-all'>
          <input type='search' value={query} onChange={e => {
            setQuery(e.target.value);
            setOpen(true);
        }} onFocus={() => setOpen(true)} placeholder='Search items...' aria-label='Search menu items' className='w-44 sm:w-56 md:w-64 lg:w-72 h-full bg-transparent text-sm text-white placeholder:text-gray-500 px-4 py-1 outline-none'/>
          <button type='submit' aria-label='Search' className='search-bar-btn flex items-center justify-center w-8 h-8 min-w-8 min-h-8 m-0.5 p-0 rounded-full bg-primary border-0 hover:bg-primary/90 transition-colors shrink-0'>
            <SearchIcon className='w-[18px] h-[18px] text-dark shrink-0 pointer-events-none'/>
          </button>
        </div>
      </form>

      {open && query.trim() && (<div className='absolute top-full left-0 mt-2 w-80 sm:w-96 rounded-xl border border-gray-700 bg-gray-900 shadow-xl z-50 overflow-hidden'>
          {results.length > 0 ? (<ul>
              {results.map(item => (<li key={item._id}>
                  <button type='button' onClick={() => goToSearch(item.name)} className='w-full flex items-center gap-3 px-3 py-2.5 hover:bg-primary/10 text-left transition-colors'>
                    <FoodImage src={item.image} alt={item.name} className='w-10 h-10 rounded-full border border-primary/40 shrink-0'/>
                    <div className='min-w-0 flex-1'>
                      <p className='text-sm font-semibold text-white truncate'>{item.name}</p>
                      <p className='text-xs text-primary'>{formatPrice(item.basePrice)}</p>
                    </div>
                  </button>
                </li>))}
              <li className='border-t border-gray-700'>
                <button type='button' onClick={() => goToSearch(query)} className='w-full px-3 py-2.5 text-sm text-primary font-semibold hover:bg-primary/10'>
                  View all results for &ldquo;{query.trim()}&rdquo;
                </button>
              </li>
            </ul>) : (<p className='px-4 py-3 text-sm text-gray-400'>No items found for &ldquo;{query.trim()}&rdquo;</p>)}
        </div>)}
    </div>);
};
export default HeaderSearch;
