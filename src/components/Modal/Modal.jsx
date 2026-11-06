import * as S from "./Modal.style";

export default function Modal({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <S.Backdrop onClick={onClose}>
      <S.Sheet role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        {title && <S.Title>{title}</S.Title>}
        {children}
      </S.Sheet>
    </S.Backdrop>
  );
}
