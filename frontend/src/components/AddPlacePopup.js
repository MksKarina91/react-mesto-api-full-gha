import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, buttonName }) {
    const [formData, setFormData] = useState({ name: '', link: '' });

    useEffect(() => {
        setFormData({ name: '', link: '' });
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace(formData);
    };

    return (
        <PopupWithForm
            name="edit-card"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonName={buttonName}
            children={
                <>
                    <input
                        onChange={handleChange}
                        value={formData.name}
                        type="text"
                        className="popup__input"
                        id="newItemName"
                        placeholder="Название"
                        name="name"
                        minLength="2"
                        maxLength="30"
                        required
                    />
                    <span className="newItemName-error popup__input-error"></span>
                    <input
                        onChange={handleChange}
                        value={formData.link}
                        type="url"
                        className="popup__input"
                        id="newItemLink"
                        placeholder="Ссылка на картинку"
                        name="link"
                        required
                    />
                    <span className="newItemLink-error popup__input-error"></span>
                </>
            }
        />
    );
}

export default AddPlacePopup;
