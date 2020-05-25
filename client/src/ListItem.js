import React from 'react';
import axios from 'axios';

export default class ListItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            itemData: [],
            itemName: '',
            id: '',
        }
    }

    componentDidMount() {
        axios.get('/list/:id/item')
            .then(res => {
                console.log('ITEMS', res.data);
                this.setState({ itemData: res.data })
            })
            .catch(err => {
                console.log('Error by GET all ITEM data', err);
            })
    }

    handleNewItem = (e) => {
        e.preventDefault();
        axios.post('/list/:id/item', { itemName: this.state.itemName, id: this.props.id })
            .then(res => {
                console.log('POSTING NEW ITEM', res);
                this.setState({ itemData: [...this.state.itemData, res.data.newItem] });
                this.setState({itemName: ''});
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
            const { item_name, item_id, description, time_stamp } = item;
            return (
                <div className="item__card" key={item_id}>
                    <h5>{item_name}</h5>
                    <p>{description}</p>
                    <p>{new Date(time_stamp).toLocaleString()}</p>
                    <button onClick={(e) => { this.handleRemoveItem(e, item_id) }}>Delete Item</button>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderItems()}

                <div className='item__create'>
                    <input 
                    type="text" className="text" 
                    value={this.state.itemName} 
                    onChange={this.onChange} 
                    placeholder='New Card'/>
                    <button onClick={(e) => { this.handleNewItem(e) }}>Add Card</button>
                </div>
            </div>
        )
    }

}