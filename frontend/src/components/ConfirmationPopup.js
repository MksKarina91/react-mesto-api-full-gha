import PopupWithForm from "./PopupWithForm";

export default function ConfirmationPopup({ isOpen, onClose, onConfirm, isLoadingForm }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onConfirm();
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name='confirm'
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle={isLoadingForm ? 'Удаление...' : 'Да'}
    ></PopupWithForm>
  );
}
