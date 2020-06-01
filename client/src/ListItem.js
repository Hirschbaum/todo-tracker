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
            itemData: [],
            itemName: '',
            id: '',
            showEdit: '',
            showMove: '',
            /*newId: '',*/
        }
    }

    componentDidMount() {
        axios.get('/list/:id/item')
            .then(res => {
                //console.log('ITEMS', res.data);
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

    /*handleNewListId = (e) => {
        this.setState({ newId: e.target.value })
    }*/

    handleNewItem = (e) => {
        e.preventDefault();
        axios.post('/list/:id/item', { itemName: this.state.itemName, id: this.props.id })
            .then(res => {
                console.log('POSTING NEW ITEM', res);
                this.setState({ itemData: [...this.state.itemData, res.data.newItem] });
                this.setState({ itemName: '' });
            })
            .catch(err => {
                console.log('Error by posting new item', err);
            })
    }

    handleRemoveItem = (e, itemId) => {
        e.preventDefault();
        axios.delete('/list/:id/item/' + itemId)
            .then(res => {
                console.log('Item to REMOVE', res);
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
                                    handleEditModal={this.handleEditModal}
                                    itemName={item_name}
                                    description={description}
                                    timeStamp={time_stamp}
                                    itemId={item_id}
                                    id={id}
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
                                    handleMoveModal={this.handleMoveModal}
                                    id={id}
                                    itemId={item_id}
                                    itemName={item_name}
                                    data={this.props.data}
                                    /*newId={this.state.newId}
                                    handleNewListId={this.handleNewListId}*/
                                    renderListNames={this.renderListNames}
                                />
                                : null}

                            <button onClick={(e) => { this.handleRemoveItem(e, item_id) }}
                                className='item__cards--button'><GoTrashcan style={{ color: '#60AEBF' }} /></button>
                        </div>
                    </div>
                </div>
            )
        })
    }


    render() {
        console.log('ListItem', this.props.data)
        return (
            <div>
                {this.renderItems()}

                <div className='item__create'>
                    <input
                        type='text' className='item__create--input'
                        value={this.state.itemName}
                        onChange={this.onChange}
                        placeholder='Add New Card' />
                    <button
                        onClick={(e) => { this.handleNewItem(e) }}
                        className='item__create--button'
                    >
                        <FaPlusCircle style={{ color: '#60AEBF', fontSize: '1.4em', padding: '0 2%' }} />
                    </button>
                </div>
            </div>
        )
    }

}