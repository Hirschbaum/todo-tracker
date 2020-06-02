import React from 'react';
import axios from 'axios';
import { GoPencil, GoTrashcan } from 'react-icons/go';
import { TiArrowForward } from 'react-icons/ti';
import { FaPlusCircle } from 'react-icons/fa';
import ModalEdit from './ModalEdit';
import ModalMove from './ModalMove';


export default class ListItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            description: '',
            errorMsg: false,
            itemData: [],
            itemName: '',
            id: '',
            showEdit: '',
            showMove: '',
        }
    }

    componentDidMount() {
        axios.get('/list/:id/item')
            .then(res => {
                this.setState({ itemData: res.data })
            })
            .catch(err => {
                console.log('Error by GET all ITEM data', err);
            })
    }

    handleEditModal = (item_id) => {
        this.setState({ showEdit: item_id });
    }

    handleMoveModal = (item_id) => {
        this.setState({ showMove: item_id });
    }

    handleNewItem = (e) => {
        e.preventDefault();
        axios.post('/list/:id/item', { itemName: this.state.itemName, id: this.props.id })
            .then(res => {
                //console.log('POSTING NEW ITEM', res);
                this.setState({ itemData: [...this.state.itemData, res.data.newItem] });
                this.setState({ itemName: '' });
                this.setState({ errorMsg: false });
            })
            .catch(err => {
                console.log('Error by posting new item', err);
                this.setState({ errorMsg: true });
            })
    }

    handleRemoveItem = (e, itemId) => {
        e.preventDefault();
        axios.delete('/list/:id/item/' + itemId)
            .then(res => {
                //console.log('Item to REMOVE', res);
                this.setState({ itemData: this.state.itemData.filter(x => itemId !== x.item_id) });
            })
            .catch(err => {
                console.log('Error by removing item', err);
            })
    }

    onChange = (e) => {
        this.setState({ itemName: e.target.value });
    }

    renderItems = () => {
        let filteredItems = this.state.itemData.filter(item => { return item.id === this.props.id });

        return filteredItems.map((item) => {
            const { item_name, item_id, description, time_stamp, id } = item;
            return (
                <div className='item__card' key={item_id}>
                    <h5>{item_name}</h5>
                    <p>{description}</p>
                    <div className='item__cards--details'>
                        <p style={{ fontSize: '0.7em', color: '#1D4B73' }}>{new Date(time_stamp).toLocaleDateString()}</p>
                        <div className='item__cards--buttonBox'>

                            {/*-------------------- EDIT BUTTON AND MODAL -------------------------------------- */}
                            <button className='item__cards--button'
                                onClick={() => { this.handleEditModal(item_id) }}
                            >
                                <GoPencil style={{ color: '#60AEBF' }} />
                            </button>
                            {this.state.showEdit === item_id ?
                                <ModalEdit
                                    description={description}
                                    handleEditModal={this.handleEditModal}
                                    id={id}
                                    itemId={item_id}
                                    itemName={item_name}
                                    timeStamp={time_stamp}
                                />
                                : null}

                            {/*-------------------- MOVE BUTTON AND MODAL -------------------------------------- */}
                            <button className='item__cards--button'
                                onClick={() => { this.handleMoveModal(item_id) }}
                            >
                                <TiArrowForward style={{ color: '#60AEBF' }} />
                            </button>
                            {this.state.showMove === item_id ?
                                <ModalMove
                                    data={this.props.data}
                                    handleMoveModal={this.handleMoveModal}
                                    id={id}
                                    itemId={item_id}
                                    itemName={item_name}
                                    renderListNames={this.renderListNames}
                                />
                                : null}

                            <button onClick={(e) => { this.handleRemoveItem(e, item_id) }}
                                className='item__cards--button'
                            >
                                <GoTrashcan style={{ color: '#60AEBF' }} />
                            </button>
                        </div>
                    </div>
                </div>
            )
        })
    }


    render() {

        let errorMsgStyle = {
            color: 'indianred',
            marginLeft: '0.7em',
            marginRight: '0.7em',
            fontSize: '0.8em',
        }

        return (
            <div>
                {this.renderItems()}

                <div className='item__create'>
                    <form onSubmit={(e) => { this.handleNewItem(e) }}>
                        <input
                            className='item__create--input'
                            minLength='3' maxLength='40'
                            onChange={this.onChange}
                            placeholder={this.state.errorMsg ? 'Oh, try again!' : 'Create New Card'}
                            type='text'
                            value={this.state.itemName}
                        />
                        <button
                            className='item__create--button'
                        >
                            <FaPlusCircle style={{ color: '#60AEBF', fontSize: '1.4em', padding: '0 2%' }} />
                        </button>
                    </form>
                </div>
                {this.state.errorMsg ? <p style={errorMsgStyle}>The card title should be at least three charachters long.</p> : null}
            </div>
        )
    }

}