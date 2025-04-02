import * as styles from './EventItem.module.scss';

interface EventProps {
  title?: string;
  description?: string;
}

export const EventItem = (props: EventProps) => {
  const {
    title = '2003',
    description = '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
  } = props;
  return (
    <div className={styles.event}>
      <h3 className={styles.event__title}>{title}</h3>
      <p className={styles.event__description}>{description}</p>
    </div>
  );
};
