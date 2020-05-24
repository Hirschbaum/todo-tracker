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
                console.log(res.data);
                this.setState({ itemData: res.data })
            })
            .catch(err => {
                console.log('Error by GET all ITEM data', err);
            })
    }

    renderItems = () => {
        let filteredItems = this.state.itemData.filter(item => { return item.id === this.props.id });

        return filteredItems.map((item) => { 
            const { id, item_name, item_id, description, time_stamp } = item;
            return (
                <div className="item__card" key={item_id}>
                    <h5>{item_name}</h5>
                    <p>{description}</p>
                    <p>{new Date(time_stamp).toLocaleString()}</p>
                    <span onClick={(e) => { this.handleRemoveItem(e, id) }}>Delete Item</span>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderItems()}

                <div className='item__create'>
                    <input type="text" className="text" />
                    <button>Add Card</button>
                </div>
            </div>
        )
    }

}