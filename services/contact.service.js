const CONTACTS_KEY = 'contans'

import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import fs from 'fs'



export const contactService = {
    query,
    save,
    removeContact,
    getContactById,

}
const contacts = utilService.readJsonFile('data/contact.data.json')


function query() {
    let contactsToReturn = contacts
    return contactsToReturn
}

function getContactById(contactId) {
    const contact = contacts.find(contact => contact._id === contactId)
    return Promise.resolve(contact)
}

function save(contact) {
    if (contact._id) {
        const conatctIdx = contacts.findIndex(currContact => currContact._id === contact._id)
        contacts[conatctIdx] = contact
    } else {
        contact={
            _id: utilService.makeId,
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            phone: contact.phone,
            desc: contact.desc
        }
        contacts.unshift(contact)

    }
    return _saveContacsToFile().then(() => contact)
}

function removeContact(contactId) {
    const contactIdx = contacts.findIndex(contact => contact._id === contactId)
    if (contactIdx === -1) return Promise.reject('No Such Bar')


    contacts.splice(contactIdx, 1)
    return _saveContacsToFile()
}

function _saveContacsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(contacts, null, 2)
        fs.writeFile('data/contact.data.json', data, (err) => {
            if (err) {
                return reject(err)
            }
            resolve()
        })
    })
}