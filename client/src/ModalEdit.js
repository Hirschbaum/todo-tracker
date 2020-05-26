import React from 'react';
import ReactDOM from 'react-dom';

const ModalEdit = (props) => {

    const cancelEditModal = () => {
        //useState to switch off the modal
    }

    const handleEditModal = () => {
        //axios patch
    }

    const onChangeDescription = (e) => {
        //useState
    }

    const onChangeTitle = (e) => {
        //useState
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
                <form onSubmit={this.onSubmit}>
                    <input
                        onChange={onChangeTitle}
                        type='text'
                        name='editCard' id='editCard'
                        placeholder='' /*should be the value of the item_name */
                        style={{ borderRadius: '0.3rem', padding: '2%', border: '1px solid #ddd', marginBottom: '10px' }}
                        min='3' max='50'
                    />

                    <label
                        htmlFor='description'
                        style={{ textAlign: 'left', fontSize: '12px', marginBottom: '3px', marginTop: '10px' }}
                    >
                        Add Description
          </label>

                    <input
                        onChange={onChangeDescription}
                        type='text'
                        name='description' id='description'
                        placeholder='Type card description here'
                        style={{ borderRadius: '0.3rem', padding: '2%', border: '1px solid #ddd' }}
                        min='3' max='100'
                    />

                    <div className='modalsButtonsContainer'>
                        <div
                            onClick={() => cancelEditModal(false)}
                            className='modalButtons'>
                            Cancel
						</div>
                        <button
                            onSubmit={() => handleEditModal()}
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