'use client';
import { CartIcon } from '@/icons/CartIcon';
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, } from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { UserIcon } from '@/icons/UserIcon';
import { TagIcon } from '@/icons/TagIcon';
import { UsersIcon } from '@/icons/UsersIcon';
import { MenuIcon } from '@/icons/MenuIcon';
import { SignOutIcon } from '@/icons/SignOutIcon';
import { usePathname } from 'next/navigation';
import { CartContext } from '../../util/ContextProvider';
import { useProfile } from '../hooks/useProfile';
import HeaderSearch from './HeaderSearch';
const PUBLIC_NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Categories', href: '/#categories' },
    { label: 'Services', href: '/#services' },
    { label: 'Contact', href: '/#contact' },
];
const CUSTOMER_NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'My Orders', href: '/orders' },
    { label: 'Help Center', href: '/help-center' },
];
const ADMIN_NAV_LINKS_BEFORE = [
    { label: 'Home', href: '/' },
    { label: 'Orders', href: '/orders' },
];
const ADMIN_NAV_LINKS_AFTER = [
    { label: 'Reports', href: '/reports' },
    { label: 'Help Desk', href: '/help-center' },
];
const Header = () => {
    const { data: session, status } = useSession();
    const { cartProducts } = useContext(CartContext);
    const pathname = usePathname();
    const { data: profileData } = useProfile();
    const [menuOpen, setMenuOpen] = useState(false);
    const isLoggedIn = status === 'authenticated' && !!session;
    const isAdmin = isLoggedIn && !!(profileData === null || profileData === void 0 ? void 0 : profileData.isAdmin);
    const isCustomer = isLoggedIn && profileData && !profileData.isAdmin;
    const iconButtonClass = 'relative flex items-center justify-center w-11 h-11 rounded-full border-2 border-primary bg-black/60 hover:bg-primary/20 transition-colors shadow-md';
    const cartButton = (<Link href='/cart' aria-label='View cart' className={iconButtonClass}>
      <CartIcon className='w-6 h-6 text-primary'/>
      <span className={`absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full text-xs font-bold flex items-center justify-center ${cartProducts.length > 0
            ? 'bg-primary text-dark'
            : 'bg-gray-700 text-gray-300 border border-primary/50'}`}>
        {cartProducts.length}
      </span>
    </Link>);
    const customerProfileButton = (<Dropdown className='text-gray-300'>
      <DropdownTrigger>
        <button type='button' aria-label='Profile menu' className={iconButtonClass}>
          {(profileData === null || profileData === void 0 ? void 0 : profileData.image) ? (<Avatar src={profileData.image} isBordered color='primary' size='sm' className='w-8 h-8'/>) : (<UserIcon className='w-6 h-6 text-primary'/>)}
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Profile actions' color='primary' variant='flat'>
        <DropdownItem key='profile' href='/profile' startContent={<UserIcon className='w-6 text-primary'/>}>
          My Profile
        </DropdownItem>
        <DropdownItem key='signOut' startContent={<SignOutIcon className='w-6'/>} onClick={() => signOut({ callbackUrl: '/' })}>
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>);
    const adminProfileButton = (<Dropdown className='text-gray-300'>
      <DropdownTrigger>
        <button type='button' aria-label='Admin profile menu' className={iconButtonClass}>
          {(profileData === null || profileData === void 0 ? void 0 : profileData.image) ? (<Avatar src={profileData.image} isBordered color='primary' size='sm' className='w-8 h-8'/>) : (<UserIcon className='w-6 h-6 text-primary'/>)}
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Admin profile menu' color='primary' variant='flat'>
        <DropdownItem key='profile' href='/profile' startContent={<UserIcon className='w-6 text-primary'/>}>
          My Profile
        </DropdownItem>
        <DropdownItem key='users' href='/users' startContent={<UsersIcon className='w-6'/>}>
          Users
        </DropdownItem>
        <DropdownItem key='signOut' startContent={<SignOutIcon className='w-6'/>} onClick={() => signOut({ callbackUrl: '/' })}>
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>);
    const navLinkClass = 'hover:text-primary whitespace-nowrap transition-colors';
    function isLinkActive(href) {
        if (href === '/')
            return pathname === '/';
        if (href.startsWith('/#'))
            return pathname === '/';
        if (href === '/orders')
            return pathname === '/orders' || pathname.startsWith('/orders/');
        return pathname === href || pathname.startsWith(`${href}/`);
    }
    const itemsDropdownActive = pathname.startsWith('/categories') || pathname.startsWith('/menu-items');
    const showSearch = isCustomer || isAdmin;
    const menuToggleClass = isCustomer || isAdmin ? 'xl:hidden text-primary' : 'lg:hidden text-primary';
    return (<Navbar isMenuOpen={menuOpen} onMenuOpenChange={setMenuOpen} maxWidth='full' className='font-semibold bg-dark/95 backdrop-blur-md py-3 border-b border-gray-800/60' classNames={{
            item: 'data-[active=true]:text-primary',
            wrapper: 'px-4 sm:px-6 lg:px-10 max-w-full gap-2',
        }}>
      <NavbarContent justify='start' className='shrink-0 gap-4 sm:gap-6'>
        <NavbarBrand className='mr-0'>
          <Link href='/' className='text-primary text-xl sm:text-2xl font-josefin font-bold whitespace-nowrap'>
            Pizza Fiesta
          </Link>
        </NavbarBrand>
        {showSearch && (<NavbarItem className='hidden xl:flex'>
            <HeaderSearch />
          </NavbarItem>)}
      </NavbarContent>

      {isCustomer && (<NavbarContent className='hidden xl:flex flex-1 gap-10 lg:gap-12 xl:gap-14 ml-8 lg:ml-14 xl:ml-20' justify='center'>
          {CUSTOMER_NAV_LINKS.map(link => (<NavbarItem key={link.label} isActive={isLinkActive(link.href)} className='px-1'>
              <Link href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            </NavbarItem>))}
        </NavbarContent>)}

      {isAdmin && (<NavbarContent className='hidden xl:flex flex-1 gap-8 lg:gap-10 xl:gap-12 ml-6 lg:ml-10 xl:ml-14' justify='center'>
          {ADMIN_NAV_LINKS_BEFORE.map(link => (<NavbarItem key={link.label} isActive={isLinkActive(link.href)} className='px-1'>
              <Link href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            </NavbarItem>))}
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <button type='button' className={`flex items-center gap-1 ${navLinkClass} ${itemsDropdownActive ? 'text-primary' : ''}`}>
                  Items
                  <ChevronDownIcon className='w-4 stroke-current'/>
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label='Items menu' color='primary' variant='flat'>
                <DropdownItem key='categories' href='/categories' startContent={<TagIcon className='w-5'/>}>
                  Categories
                </DropdownItem>
                <DropdownItem key='menu-items' href='/menu-items' startContent={<MenuIcon className='w-5'/>}>
                  Menu
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          {ADMIN_NAV_LINKS_AFTER.map(link => (<NavbarItem key={link.label} isActive={isLinkActive(link.href)} className='px-1'>
              <Link href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            </NavbarItem>))}
        </NavbarContent>)}

      {!isLoggedIn && (<NavbarContent className='hidden lg:flex gap-8 xl:gap-10' justify='center'>
          {PUBLIC_NAV_LINKS.map(link => (<NavbarItem key={link.label} isActive={isLinkActive(link.href)}>
              <Link href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            </NavbarItem>))}
        </NavbarContent>)}

      <NavbarContent justify='end' className='gap-3'>
        {isCustomer && (<div className='flex items-center gap-3'>
            {customerProfileButton}
            {cartButton}
          </div>)}
        {isAdmin && <div className='flex items-center gap-3'>{adminProfileButton}</div>}
        {!isLoggedIn && (<div className='hidden sm:flex items-center gap-5'>
            <Link href='/login' className='hover:text-primary transition-colors'>
              Login
            </Link>
            <Button as={Link} color='primary' href='/register' className='font-semibold rounded-full px-6 text-dark'>
              Sign Up
            </Button>
          </div>)}
        <NavbarMenuToggle aria-label='Toggle menu' className={menuToggleClass}/>
      </NavbarContent>

      <NavbarMenu className='bg-dark pt-6 pb-8 gap-2'>
        {showSearch && (<NavbarMenuItem className='mb-4 px-2 xl:hidden'>
            <HeaderSearch />
          </NavbarMenuItem>)}

        {isCustomer &&
            CUSTOMER_NAV_LINKS.map(link => (<NavbarMenuItem key={link.label}>
              <Link href={link.href} className='block w-full py-3 text-lg hover:text-primary transition-colors' onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            </NavbarMenuItem>))}

        {isAdmin && (<>
            {[...ADMIN_NAV_LINKS_BEFORE, ...ADMIN_NAV_LINKS_AFTER].map(link => (<NavbarMenuItem key={link.label}>
                <Link href={link.href} className='block w-full py-3 text-lg hover:text-primary transition-colors' onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              </NavbarMenuItem>))}
            <NavbarMenuItem>
              <Link href='/categories' className='block w-full py-3 text-lg hover:text-primary' onClick={() => setMenuOpen(false)}>
                Categories
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link href='/menu-items' className='block w-full py-3 text-lg hover:text-primary' onClick={() => setMenuOpen(false)}>
                Menu
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link href='/profile' className='block w-full py-3 text-lg hover:text-primary' onClick={() => setMenuOpen(false)}>
                My Profile
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link href='/users' className='block w-full py-3 text-lg hover:text-primary' onClick={() => setMenuOpen(false)}>
                Users
              </Link>
            </NavbarMenuItem>
          </>)}

        {!isLoggedIn &&
            PUBLIC_NAV_LINKS.map(link => (<NavbarMenuItem key={link.label}>
              <Link href={link.href} className='block w-full py-3 text-lg hover:text-primary transition-colors' onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            </NavbarMenuItem>))}

        {isCustomer && (<>
            <NavbarMenuItem>
              <Link href='/profile' className='block w-full py-3 text-lg hover:text-primary' onClick={() => setMenuOpen(false)}>
                My Profile
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link href='/cart' className='block w-full py-3 text-lg hover:text-primary' onClick={() => setMenuOpen(false)}>
                Cart ({cartProducts.length})
              </Link>
            </NavbarMenuItem>
          </>)}

        {isLoggedIn && (<NavbarMenuItem>
            <button type='button' className='block w-full py-3 text-lg text-left hover:text-primary' onClick={() => {
                setMenuOpen(false);
                signOut({ callbackUrl: '/' });
            }}>
              Sign Out
            </button>
          </NavbarMenuItem>)}

        {!isLoggedIn && (<>
            <NavbarMenuItem>
              <Link href='/login' className='block w-full py-3 text-lg hover:text-primary' onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link href='/register' onClick={() => setMenuOpen(false)}>
                <Button color='primary' className='w-full font-semibold text-dark mt-2'>
                  Sign Up
                </Button>
              </Link>
            </NavbarMenuItem>
          </>)}
      </NavbarMenu>
    </Navbar>);
};
export default Header;
