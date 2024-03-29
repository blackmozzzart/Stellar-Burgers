import { useRef } from 'react';
import styles from './constructorElementWrapper.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd'
import { useAppDispatch } from '../../services/store';
import { TIngredient } from '../../services/redux/types/types';
import { REMOVE_INGREDIENT, moveIngredient } from '../../services/redux/actions/burgerConstructor';

type ConstructorElementWrapperProps = {
  ingredient: TIngredient;
  index: number;
};

export const ConstructorElementWrapper = ({ ingredient, index }: ConstructorElementWrapperProps) => {
  const dispatch = useAppDispatch()

  const ref = useRef<HTMLDivElement | null>(null)
  const [, drop] = useDrop<ConstructorElementWrapperProps>({
    accept: 'constructorElement',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset?.y || 0) - hoverBoundingRect?.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      dispatch(moveIngredient(dragIndex, hoverIndex))
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'constructorElement',
    item: () => {

      return { id: ingredient.id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <div className={`${styles.row} pr-2`} ref={ref} style={{ opacity }}>
      <div className='mr-2'>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        handleClose={() => {
          dispatch({ type: REMOVE_INGREDIENT, payload: index })
        }}
      />
    </div>
  );
};
