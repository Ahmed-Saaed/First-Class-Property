'use client';
import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {fetchProperty} from '@/utils/request';
import PropertyHeaderImage from '@/components/propertyHeaderImage';
import PropertyImages from '@/components/PropertyImages';
import Link from 'next/link';
import PropertyDetails from '@/components/PropertyDetails';
import {FaArrowLeft} from 'react-icons/fa';
import Spinner from '@/components/Spinner';
import BookmarkButton from '@/components/bookmarkButton';
import SharekButtons from '@/components/ShareButtons';
import PropertyContactForm from '@/components/PropertyContactForm';

const PropertyPage = () => {
  const {id} = useParams();
  const [property, setProperty] = useState(null);
  // if we are fetching from the client you must do the loading manually
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSingleProperty = async () => {
      if (!id) return;

      try {
        const property = await fetchProperty(id);
        console.log(id, property);
        setProperty(property);
      } catch (error) {
        console.error('error fetching property: ', error);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchSingleProperty();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Propertry Not Found
      </h1>
    );
  }
  return (
    <>
      {loading && <Spinner loading />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className='container m-auto py-6 px-6'>
              <Link
                href='/properties'
                className='text-blue-500 hover:text-blue-600 flex items-center'
              >
                <FaArrowLeft className='mr-2' /> Back to Properties
              </Link>
            </div>
          </section>
          <section className='bg-blue-50'>
            <div className='container m-auto py-10 px-6'>
              <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                <PropertyDetails property={property} />
                {/* <!-- Sidebar --> */}
                <aside className='space-y-4'>
                  <BookmarkButton property={property} />
                  <SharekButtons />
                  {/* <!-- Contact Form --> */}
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};

export default PropertyPage;
