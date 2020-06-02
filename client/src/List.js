import React from 'react';
import axios from 'axios';
import { FaPlusCircle } from 'react-icons/fa';
import { GoTrashcan } from 'react-icons/go';
import ListItem from './ListItem';
import Header from './Header';

export default class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            name: '',
            showErrorMsg: false,
        }

    }

    componentDidMount() {
        axios.get('/list')
            .then(res => {
                //console.log('LISTS', res.data);
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
                //console.log('GOT RESPONSE POSTING NEW LIST', res);
                this.setState({ data: [...this.state.data, res.data.newList] });
                this.setState({ name: '' });
                this.setState({ showErrorMsg: false });
            })
            .catch(err => {
                console.log('Error by posting new list', err);
                this.setState({ showErrorMsg: true });
            })
    }

    handleRemoveList = (e, id) => {
        e.preventDefault();
        axios.delete('/list/' + id)
            .then(res => {
                //console.log('List to REMOVE', res);
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
                        <h4 style={{ marginLeft: '1em' }}>{name}</h4>
                        <h4
                            onClick={(e) => { this.handleRemoveList(e, id) }}
                            style={{ marginRight: '0.7em' }}
                        >
                            <GoTrashcan />
                        </h4>
                    </div>
                    <div className="list__items">
                        <ListItem id={id} data={this.state.data} />
                    </div>
                </div>
            )
        })
    }

    render() {

        return (
            <>
                <Header data={this.state.data} />

                <div className="list__container">
                    {this.renderLists()}

                    <div className='list__create'>
                        <form onSubmit={(e) => { this.handleNewList(e) }}>
                            <div className='list__create--input-div'>
                                <input
                                    maxLength='15'
                                    minLength='3'
                                    onChange={this.onChange}
                                    placeholder={this.state.showErrorMsg ? 'Ups, try again!' : 'Create New List'}
                                    type='text'
                                    value={this.state.name}
                                />
                            </div>

                            <div className='list__create--btn-div'>
                                <button className='list__create--btn'>
                                    <FaPlusCircle style={{ color: '#60AEBF', fontSize: '1.4em', padding: '0 2%' }} />
                                </button>
                            </div>
                        </form>

                    </div>

                </div>
            </>
        )
    }

}