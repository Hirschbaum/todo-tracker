import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const ModalMove = (props) => {

    const [id, update] = useState('');

    const onChangeListId = () => {
        update(id);
    }

    const cancelMoveModal = (str) => {
        props.handleMoveModal();
    }

    const moveItem = (e) => {
        e.preventDefault();
        let listId = props.id;
        let itemId = props.itemId;
        console.log(props.id, props.itemId, id)
        axios.patch(`/list/${listId}/item/${itemId}/move`, { newId: id })
            .then(res => {
                console.log('MOVING THIS CARD', res);
                window.location.reload();
                cancelMoveModal('');
            })
            .catch(err => {
                console.log('Error by moving list item alias CARD', err);
            })
    }

   const renderListNames = (props) => {
        return props.data.map(list => {
            const { name, id } = list;
            return (
                <option value={id} key={id}> {name} </option> //need this value as newId
            )
        })
    }



    return ReactDOM.createPortal(
        <div className='modalContainer'>
            <div className='modalBox'>
                <div className='modalHeadline'>
                    <h5> Move Card</h5>
                </div>

                <form onSubmit={moveItem}>
                    <label
                        htmlFor='moveCard'
                        style={{ textAlign: 'left', fontSize: '12px', marginBottom: '3px', marginTop: '10px' }}
                    >
                        Move <span style={{color: '#1D4B73', fontWeight: '700'}}>{props.itemName} </span> card to this list: 
				    </label>

                    <select 
                    value={id}
                    onChange={onChangeListId}
                    name="moveCard" id="moveCard" required>
                        {renderListNames(props)}
                    </select>

                    <div className='modalsButtonsContainer'>
                        <div
                            onClick={cancelMoveModal}
                            className='modalButtons'>
                            Cancel
						</div>
                        <button
                            onSubmit={moveItem}
                            type='submit'
                            className='modalButtons blueButtons'>
                            Move
						</button>
                    </div>
                </form>

            </div>
        </div>,
        document.body
    )
}

export default ModalMove;