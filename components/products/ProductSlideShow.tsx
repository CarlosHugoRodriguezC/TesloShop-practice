import { FC } from 'react';

import { Slide } from 'react-slideshow-image';

import styles from './ProductSlideShow.module.css';
import 'react-slideshow-image/dist/styles.css'


interface Props {
  images: string[];
}

export const ProductSlideShow: FC<Props> = ({ images }) => {
  return (
    <Slide easing='ease' duration={700} indicators>
      {images.map((image, index) => {
        const url = `${image}`;
        return (
          <div className={styles['each-slide']} key={url}>
            <div
              style={{
                backgroundImage: `url(${url})`,
                backgroundSize: 'cover',
              }}></div>
          </div>
        );
      })}
    </Slide>
  );
};
