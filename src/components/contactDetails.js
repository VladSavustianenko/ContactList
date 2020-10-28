import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import {infoKeys, contacts} from '../data/contacts'

class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            contact: null,
            infoKeys: [],
            active: null,
            delete: false,
            currentKey: null,
            currentValue: null,
            newKey: null,
            newValue: null,
            add: false
        }

        this.renderDetails = this.renderDetails.bind(this)
        this.deleteHandle = this.deleteHandle.bind(this)
        this.deleteSubmit = this.deleteSubmit.bind(this)
        this.editHandle = this.editHandle.bind(this)
        this.saveHandle = this.saveHandle.bind(this)
        this.addInfo = this.addInfo.bind(this)
    }

    async componentDidMount() {
        contacts.map(contact => (
            contact.id === this.state.id ? this.setState({contact: contact.info}) : null
        ))

        let arr = [];
        for (let key in contacts[this.state.id - 1].info) {
            arr.push(key)
        }

        for (let i = 0; i < arr.length; i++) {
            infoKeys[i] = arr[i]
        }
    }

    renderDetails() {
        if (infoKeys) {
            return (
                infoKeys.map(key => (
                    <div key={key} className="m-1 border bg-white">
                        <span>{key}: {this.state.contact[key]}</span>
                        <button
                            className="btn btn-warning ml-1"
                            onClick={() => this.editHandle(key)}>
                                Edit
                        </button>
                        <button
                            className="btn btn-danger ml-1"
                            onClick={() => this.deleteHandle(key)}>
                                Delete
                        </button>
                    </div>
                    )
                )
            )
        }
    }

    editHandle(key) {
        contacts.map(contact => (
            contact.id === this.state.id
            ? this.setState({ active: key, currentKey: key, currentValue: contact.info[key], newKey: key, newValue: contact.info[key]})
            : null
        ))
    }
    
    saveHandle() {
        if (this.state.newKey && this.state.newValue) {
            delete contacts[this.state.id - 1].info[this.state.active]
            contacts[this.state.id - 1].info[this.state.newKey] = this.state.newValue

            this.setState({active: null, currentKey: null, newKey: null, currentValue: null, newValue: null})
        }
    }

    deleteSubmit() {
        delete contacts[this.state.id - 1].info[this.state.active]
        this.setState({active: null, delete: false})
    }

    deleteHandle(key) {
        this.setState({active: key, delete: true})
    }

    addInfo() {
        if (this.state.newKey && this.state.newValue) {
            contacts[this.state.id - 1].info[this.state.newKey] = this.state.newValue

            this.setState({newKey: null, newValue: null, add: false})
        }
    }

    render() {
        if (this.state.id) {
            infoKeys.splice(0, infoKeys.length)
            let arr = []
            for (let key in this.state.contact) {
                arr.push(key)
            }
            for (let i = 0; i < arr.length; i++) {
                infoKeys[i] = arr[i]
            }

            return (
                <div>
                    <div className="bg-primary p-5 d-flex">
                        <span className="text-white text-header">Contacts.com</span>
                        {
                            this.state.active && this.state.currentKey
                            ? <div className="ml-auto">
                                <input
                                    type="text"
                                    defaultValue={this.state.currentKey}
                                    onChange={(e) => this.setState({newKey: e.target.value})}
                                />
                                <input
                                    type="text"
                                    defaultValue={this.state.currentValue}
                                    onChange={(e) => this.setState({newValue: e.target.value})}
                                />
                                <button
                                    className="btn btn-success ml-2"
                                    onClick={this.saveHandle}>
                                    Save
                                </button>
                                <button
                                    className="btn btn-warning ml-2"
                                    onClick={() => this.setState({active: null})}>
                                    Cancel
                                </button>
                                </div>
                            : null
                        }
                        {
                            this.state.active && this.state.delete
                            ? <div className="ml-auto">
                                <span className="text-white">Delete?</span>
                                <button
                                    className="btn btn-success ml-2"
                                    onClick={this.deleteSubmit}>
                                    Yes
                                </button>
                                <button
                                    className="btn btn-danger ml-2"
                                    onClick={() => this.setState({active: null, delete: false})}>
                                    No
                                </button>
                                </div>
                            : null
                        }
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 ml-auto mr-auto mt-5 main">
                                <span className="main-text">
                                    {contacts.map(contact => (
                                        contact.id === this.state.id ? contact.name : null
                                    ))}
                                </span>
                                <div className="p-2">
                                    <this.renderDetails />
                                    {
                                        this.state.add
                                            ? <div className="ml-auto">
                                                <input
                                                    type="text"
                                                    onChange={(e) => this.setState({newKey: e.target.value})}
                                                />
                                                <input
                                                    type="text"
                                                    className="ml-1"
                                                    onChange={(e) => this.setState({newValue: e.target.value})}
                                                />
                                                <button
                                                    className="btn btn-success ml-2"
                                                    onClick={this.addInfo}>
                                                        Save
                                                </button>
                                                <button
                                                    className="btn btn-warning ml-2"
                                                    onClick={() => this.setState({add: false})}>
                                                        Cancel
                                                </button>
                                            </div>
                                            : null
                                    }
                                    <Link
                                        to='/'
                                        className="btn btn-info">
                                            Back
                                    </Link>
                                    <button
                                        className="btn btn-success ml-2"
                                        onClick={() => this.setState({add: true})}>
                                            Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Details