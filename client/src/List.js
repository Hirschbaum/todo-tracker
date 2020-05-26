import React from 'react';
import axios from 'axios';
import { GoTrashcan } from 'react-icons/go';
import ListItem from './ListItem';

export default class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            name: '',
        }

    }

    componentDidMount() {
        axios.get('/list')
            .then(res => {
                console.log('LISTS', res.data);
                this.setState({ data: res.data })
            })
            .catch(err => {
                console.log('Error by GET all data', err);
            })
    }

    handleNewList = (e) => {
        e.preventDefault();
        axios.post('/list', { name: this.state.name })
            .then(res => {
                console.log('GOT RESPONSE POSTING NEW LIST', res);
                this.setState({ data: [...this.state.data, res.data.newList] });
                this.setState({ name: '' });
            })
            .catch(err => {
                console.log('Error by posting new list', err);
            })
    }

    handleRemoveList = (e, id) => {
        e.preventDefault();
        axios.delete('/list/' + id)
            .then(res => {
                console.log('List to REMOVE', res);
                this.setState({ data: this.state.data.filter(x => id !== x.id) });
            })
            .catch(err => {
                console.log('Error by removing list', err);
            })
    }

    onChange = (e) => {
        this.setState({ name: e.target.value });
    }

    renderLists = () => {
        return this.state.data.map((list) => {
            const { name, id } = list;
            return (
                <div className="list__box" key={id}>
                    <div className="list__box--header">
                        <h4 style={{marginLeft: '1em'}}>{name}</h4>
                        <h4 
                        onClick={(e) => { this.handleRemoveList(e, id) }}
                        style={{marginRight: '0.7em'}}><GoTrashcan /></h4>
                    </div>
                    <div className="list__items">
                        <ListItem id={id} />
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="list__container">
                {this.renderLists()}

                <div className='list__create'>
                    <div className='list__create--input-div'>
                        <input type='text' value={this.state.name} onChange={this.onChange} placeholder='New List' />
                    </div>

                    <div className='list__create--btn-div'>
                        <button onClick={(e) => { this.handleNewList(e) }}>
                            Add
                        </button>
                    </div>
                </div>

            </div>
        )
    }

}