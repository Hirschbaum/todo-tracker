import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const ModalMove = (props) => {

    const [newId, update] = useState(props.newId);

    const onChangeListId = (e) => {
        update(e.target.value);
    }

    const cancelMoveModal = (str) => {
        props.handleMoveModal();
    }

    /*const renderListNames = () => {
        props.renderListNames();
    }*/

    const moveItem = (e) => {
        e.preventDefault();
        console.log(props.arams.match.id, props.itemId, props.newId)
        let id = props.id;
        let itemId = props.itemId;
        axios.patch(`/list/${id}/item/${itemId}/move`, { id: props.newId })
            .then(res => {
                console.log('MOVEING THIS CARD', res);
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
                <option value={id}> {name} </option>
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
                        Move this card to this list:
				    </label>

                    <select 
                    value={newId}
                    onChange={onChangeListId}
                    name="moveCard" id="moveCard" required>
                        {renderListNames()}
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