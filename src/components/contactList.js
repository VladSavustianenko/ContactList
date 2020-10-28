import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {contacts} from '../data/contacts'

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
          active: null,
          currentName: null,
          newName: null,
          delete: false,
          add: false
        }
    
        this.editHandle = this.editHandle.bind(this)
        this.saveHandle = this.saveHandle.bind(this)
        this.deleteHandle = this.deleteHandle.bind(this)
        this.deleteSubmit = this.deleteSubmit.bind(this)
        this.addContact = this.addContact.bind(this)
        }

      details(id) {
        this.props.detailHandler(id)
      }
    
      editHandle(id) {
        contacts.map(contact => (
          contact.id === id ? this.setState({ active: id, currentName: contact.name, newName: contact.name })
            : null
        ))
      }
    
      saveHandle() {
        if (this.state.newName) {
          contacts.map(contact => (
            contact.id === this.state.active ? contact.name = this.state.newName : null
          ))
          this.setState({active: null, currentName: null, newName: null})
        }
      }
    
      deleteSubmit() {
        contacts.splice(this.state.active - 1, 1)
        for (let i = 0; i < contacts.length; i++) {
          contacts[i].id = i + 1
        }
        this.setState({active: null, currentName: null, newName: null, delete: false})
      }
    
      deleteHandle(id) {
        this.setState({active: id, delete: true})
      }
    
      addContact() {
        if (this.state.newName) {
          contacts.push({
            id: contacts.length + 1,
            name: this.state.newName,
            info: {}
          })
          this.setState({newName: null, add: false})
        }
      }
    
      render() {
        return (
          <div>
            <div className="bg-primary p-5 d-flex">
              <span className="text-white text-header">Contacts.com</span>
              {
                this.state.active && this.state.currentName
                  ? <div className="ml-auto">
                      <input
                        type="text"
                        defaultValue={this.state.currentName}
                        onChange={(e) => this.setState({newName: e.target.value})}
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
                  <span className="main-text">Contact list</span>
                  <div className="p-2">
                    {
                      contacts.map(contact => (
                        <div key={contact.id} className="m-1 border bg-white">
                          <span className="name">{contact.name} {contact.surname}</span>
                          <Link
                            to={'/' + contact.id}
                            className="btn btn-info d-inline-flex pl-1 pt-1"
                            onClick={() => this.details(contact.id)}>
                            <span>Details</span>
                          </Link>
                          <button
                            className="btn btn-warning ml-1"
                            onClick={() => this.editHandle(contact.id)}>
                              Edit
                          </button>
                          <button
                            className="btn btn-danger ml-1"
                            onClick={() => this.deleteHandle(contact.id)}>
                              Delete
                          </button>
                        </div>
                      ))
                    }
                    {
                      this.state.add
                        ? <div className="ml-auto">
                            <input
                              type="text"
                              onChange={(e) => this.setState({newName: e.target.value})}
                            />
                            <button
                              className="btn btn-success ml-2"
                              onClick={this.addContact}>
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
                    <button
                      className="btn btn-success"
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

export default List