'use client';
import HomeSlider from '@/components/layout/HomeSlider';
import AboutSection from '@/components/layout/AboutSection';
import ContactSecton from '@/components/layout/ContactSection';
import HomeCategoriesSection from '@/components/features/home/HomeCategoriesSection';
import HomeOffersSection from '@/components/features/home/HomeOffersSection';
import HomeFeaturesSection from '@/components/features/home/HomeFeaturesSection';
import HomeReviewsSection from '@/components/features/home/HomeReviewsSection';
import HomeBestSellersSection from '@/components/features/home/HomeBestSellersSection';
import AdminDashboard from '@/components/features/admin/AdminDashboard';
import { useProfile } from '@/components/hooks/useProfile';
import { useSession } from 'next-auth/react';
const HomePageContent = () => {
    const { status } = useSession();
    const { data: profileData, loading: profileLoading } = useProfile();
    const isAdmin = status === 'authenticated' && !profileLoading && profileData && profileData.isAdmin;
    const isCustomer = status === 'authenticated' && !profileLoading && profileData && !profileData.isAdmin;
    const customerSections = (<>
      <HomeCategoriesSection />
      <HomeBestSellersSection />
      <HomeOffersSection />
    </>);
    const publicSections = (<>
      <AboutSection />
      <HomeCategoriesSection />
      <HomeOffersSection />
      <HomeFeaturesSection />
      <HomeReviewsSection />
      <ContactSecton />
    </>);
    if (isAdmin) {
        return <AdminDashboard />;
    }
    return (<>
      <HomeSlider />
      {status === 'loading' || profileLoading ? (<HomeCategoriesSection />) : isCustomer ? (customerSections) : (publicSections)}
    </>);
};
export default HomePageContent;
