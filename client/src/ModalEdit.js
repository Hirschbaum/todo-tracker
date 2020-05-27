import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const ModalEdit = (props) => {

    const [ descriptionInput, updateDescription ] = useState(props.description);
    const [ titleInput, updateTitle ] = useState(props.itemName);

    const cancelEditModal = () => {
        props.handleEditModal();
    }

    const handleEditedChanges = () => {
        //axios patch
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
                        value={titleInput}
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
                        value={descriptionInput}
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