import React, { useRef, useState } from 'react';
import styles from '../styles/MainPage.module.css';
import spaceLogo from '../assets/space_background.png';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/serverApi';
import Categories from '../components/Categories';
import Spinner from 'react-bootstrap/Spinner';

const MainPage = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const scrollContainerRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(null);

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

  if (isLoading) return  <div className={styles.loading}><Spinner animation="border" variant="primary" /> <p>Loading...</p></div>
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.main}>
      <div className={styles.background}>
        <div className={styles.text}>
          <p>ბლოგი</p>
        </div>
        <div className={styles.backgroundImg}>
          <img src={spaceLogo} alt="background img" />
        </div>
      </div>
      <div
        className={styles.scrollContainer}
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className={styles.categories}>
          {data.data.map((category) => (
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
  );
};

export default MainPage;
