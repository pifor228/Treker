import type { CreaterItemProps } from '../../types'

function CreaterItem({ title}: CreaterItemProps) {
  return (
    <li>
      <strong>{title}</strong>
    </li>
  );
}

export default CreaterItem;