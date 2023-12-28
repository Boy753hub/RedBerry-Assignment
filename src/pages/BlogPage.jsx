import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { GetBlogsById } from '../api/serverApi';
import styles from '../styles/BlogPage.module.css'
import goBack from '../assets/Arrow.png'
import Categories from '../components/Categories';
import { Carousel } from 'bootstrap';
import Blog from '../components/Blog';
import { useHeaderContext } from '../contexts/headerContexts';

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const { isLoading, error, data, refetch} = useQuery({
    queryKey: ['BlogById'],
    queryFn: () => GetBlogsById(id),
  });
  const { isLoading: loadblog, error: errblog, data: blogData } = useHeaderContext()
  const scrollContainerRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(null);

  

  const filteredBlogs = blogData?.data?.filter((blog) =>
  blog.categories?.some((category) =>
    data.categories.some((selectedCategoryId) => selectedCategoryId === category.id)
  )
) || [];
  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; //scroll-speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };



  const goBackF = () => {
    navigate("/");
  };

  if(isLoading) {
    return <div>loading...</div>
  }
  if(error) {
    return <div><p>{error}</p></div>
  }
  if (data){ console.log(data); }
  if (blogData){ console.log(blogData); }
  return (
    <div className={styles.BlogPage}>
      <div className={styles.backButton}>
        <img src={goBack} alt="Back" onClick={goBackF} />
      </div>
      <div className={styles.Post}>
        <div className={styles.image}>
          <img src={data.image} alt="" />
        </div>
        <div className={styles.author}>
          <p>{data.author}</p>
        </div>
        <div className={styles.date}>
          <p>{data.publish_date}</p>
          { data.email && <p> &bull;  { data.email}</p>}
        </div>
        <div className={styles.title}>
          <h1>{data.title}</h1>
        </div>
        <div className={styles.categories}>
            <div
            className={styles.scrollContainer}
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <div className={styles.categories}>
            {data.categories.map((category) => (
                <Categories
                key={category.id}
                title={category.title}
                text_color={category.text_color}
                background_color={category.background_color}
                />
            ))}
            </div>
           </div>
        </div>
        <div className={styles.desc}>
          <p>{data.description}</p>
        </div>
      </div>
      {data && <div className={styles.Carousel}>
        <div className={styles.options}>
              <h1>მსგავსი სტატიები</h1>
              <div className={styles.buttons}>
                <div className={styles.left}><h1>{'<'}</h1></div>
                <div className={styles.right}><h1>{'>'}</h1></div>
              </div>
        </div>
        <div className={styles.carouselItems}>
        <div className={styles.blogsContainer}>
          <div className={styles.blogs}>
          {filteredBlogs?.map((data) => (
            <Blog
              key={data.id}
              title={data.title}
              email={data.email}
              image={data.image}
              desc={data.description}
              author={data.author}
              date={data.publish_date}
              categories={data.categories}
              id={data.id}
            />
          ))}
          </div>
          </div>
        </div>

      </div>}
    </div>
  )
}

export default BlogPage