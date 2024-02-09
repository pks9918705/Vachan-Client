import React from 'react'
import styles from './CardHomeScreen.module.css'
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartRedux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CardHomeScreen = ({ item }) => {

  // const cart = useSelector((state) => state.cart);
  // console.log(cart);

  const dispatch = useDispatch();
  // console.log("CardHomeScreen",item)

  const handleAddQuantity = (obj) => {
    dispatch(addProduct(obj));
  };


  return (
    <div>
      <div className={styles.container}>
        <div className={styles.left}>

          <div  >
            {/* <img src={item.img} alt="" /> */}
            <LazyLoadImage
            // alt={item.alt}
            // height={item.height}
            src={item.img} // use normal <img> attributes as props
            // width={image.width} 
            effect="blur"
            />
          </div>
          

        </div>
        <div className={styles.right}>
          <div className={styles.upperRight}>

            <div className={styles.title}>
              <p >{item.title}</p>
            </div>
            <div className={styles.price}>
              <p >Rs {item.price}</p>
            </div>



          </div >
          <div className={styles.bottom}>
            <button onClick={() => handleAddQuantity({ ...item, quantity: 1 })} className={styles.btn}>Add to cart</button>
            <div className={styles.instock}>
              <p >instock</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default CardHomeScreen
