import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const ModalEdit = (props) => {

    const [description, updateDescription] = useState(props.description);
    const [itemName, updateTitle] = useState(props.itemName);

    const cancelEditModal = (str) => {
        props.handleEditModal();
    }

    const handleEditedChanges = (e) => {
        e.preventDefault();
        console.log(itemName, description)
        let id = props.id;
        let itemId = props.itemId;
        axios.patch(`/list/${id}/item/${itemId}`, { itemName: itemName, description: description })
            .then(res => {
                console.log('EDITING CARD', res);
                window.location.reload(); 
                cancelEditModal(''); //to close the modal: change the id to empty string
            })
            .catch(err => {
                console.log('Error by editing list item alias CARD', err);
            })
    }

    const onChangeDescription = (e) => {
        updateDescription(e.target.value);
    }

    const onChangeTitle = (e) => {
        updateTitle(e.target.value);
    }

    return ReactDOM.createPortal(
        <div className='modalContainer'>
            <div className='modalBox'>
                <div className='modalHeadline'>
                    <h5> Edit Card</h5>
                </div>

                <label
                    htmlFor='editCard'
                    style={{ textAlign: 'left', fontSize: '12px', marginBottom: '3px', marginTop: '10px' }}
                >
                    Card Titel
				</label>
                <form onSubmit={handleEditedChanges}>
                    <input
                        value={itemName}
                        onChange={onChangeTitle}
                        type='text'
                        name='editCard' id={props.itemName}
                        placeholder={props.itemName}
                        style={{ borderRadius: '0.3rem', padding: '2%', border: '1px solid #ddd', marginBottom: '10px' }}
                        minLength='3' maxLength='50'
                    />

                    <label
                        htmlFor='description'
                        style={{ textAlign: 'left', fontSize: '12px', marginBottom: '3px', marginTop: '10px' }}
                    >
                        Add Description
          </label>

                    <input
                        onChange={onChangeDescription}
                        value={description}
                        type='text'
                        name='description' id={props.timeStamp}
                        placeholder='Type card description here'
                        style={{ borderRadius: '0.3rem', padding: '2%', border: '1px solid #ddd' }}
                        minLength='3' maxLength='100'
                    />

                    <div className='modalsButtonsContainer'>
                        <div
                            onClick={cancelEditModal}
                            className='modalButtons'>
                            Cancel
						</div>
                        <button
                            onSubmit={handleEditedChanges}
                            type='submit'
                            className='modalButtons blueButtons'>
                            Except
						</button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    )
}

export default ModalEdit;