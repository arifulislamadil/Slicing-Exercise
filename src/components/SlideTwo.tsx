import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import { CSSProperties, useEffect, useState } from 'react'

type TCard = {
  title: string
  description: string
}

const SlideTwo = () => {
  const [data, setData] = useState<TCard[]>([]);
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);



  const handleImageLoad = () => {
    setLoading(false); // Set loading to false when the image has loaded
  };



  const getImage = async () => {
    try {

      const response = await fetch('data/asset.json');
      const data = await response.json();
      setImage(data[0].image);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const getData = async () => {
    try {
      const response = await fetch('data/card.json');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getImage();
  }, []);



  return (
    <>
      <main className='absolute inset-0 -z-10'>
        {
          loading ? (<p className='text-transparent'>"Image is loading"</p>):(
            <img
          src={image}
          alt='globe image'
          onLoad={handleImageLoad}
          className='object-cover object-top w-full h-full'
        />
          )
        }
      </main>

      <section className='fixed top-1/2 left-1/2 -translate-x-1/2 transform -translate-y-1/2 text-center w-full px-16 md:px-0 md:max-w-[800px] md:ml-36 text-white'>
        <>
          <Swiper
            slidesPerView={1}
            centeredSlides={true}
            spaceBetween={10}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='mySwiper md:mx-[80px] md:static'
            breakpoints={{
              375: {
                slidesPerView: 1,
                spaceBetween: 7,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 7,
              },
            }}
            style={
              {
                '--swiper-navigation-color': '#fff',
              } as CSSProperties
            }
          >
            {data && 
              data.map(d => (
                <SwiperSlide
                  key={d.title}
                  className='bg-white text-black opacity-70  text-left p-4 rounded-tl-[2rem] rounded-br-[2rem]'
                >
                  <h1 className='text-xl font-bold'>{d.title}</h1>
                  <p className='mt-4'>{d.description}</p>
                </SwiperSlide>
              ))}
          </Swiper>
        </>
      </section>
    </>
  )
}
export default SlideTwo
