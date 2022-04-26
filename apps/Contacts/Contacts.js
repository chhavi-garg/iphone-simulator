// Storage Controller
const StorageCtrl= (function() {

    // Public methods
    return {

        // Store Contact
        storeContact: function(contact) {
            let contacts= null;

            if(localStorage.getItem('Contacts') === null) {
                contacts= [];

                contacts.push(contact);

                localStorage.setItem('Contacts', JSON.stringify(contacts));

            } else {
                contacts= JSON.parse(localStorage.getItem('Contacts'));

                contacts.push(contact)

                localStorage.setItem('Contacts', JSON.stringify(contacts));
            }

        },
        // get contacts from localStorage
        getContacts: function() {
            let contacts= null;

            if(localStorage.getItem('Contacts') === null ) {
                contacts= [];
            } else {
                contacts= JSON.parse(localStorage.getItem('Contacts'));
            }
            return contacts;
        },
        updateContactFromLS: function(updatedCont) {
            let lsContacts= JSON.parse(localStorage.getItem('Contacts'));

            lsContacts.forEach(function(contact, index) {
                if(contact.id === updatedCont.id) {
                    // Update with new one
                    lsContacts.splice(index, 1, updatedCont);
                }
            });
            // set the value again in localStorage
            localStorage.setItem('Contacts', JSON.stringify(lsContacts));
        },
        deleteContactFromLS: function(id) {
            let lsContacts= JSON.parse(localStorage.getItem('Contacts'));
            lsContacts.forEach(function(contact, index) {
                if(id === contact.id) {
                    lsContacts.splice(index, 1);
                }
            });
            // set value again after deleting current one.
            localStorage.setItem('Contacts', JSON.stringify(lsContacts));
        },
        deleteEverythingFromLS: function() {
            localStorage.removeItem('Contacts');
        }

    }
})();

// Data Controller
const contactsDataCtrl= (function() {

    // Contact Class
    class Contact {
        constructor(id, firstName, lastName, phone) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.phone = phone;
        }
    }

    // Data Structure
    const contacts= {
        details: StorageCtrl.getContacts(),
        currentData: null
    };

    // Public methods
    return {
        addToContactsDS: function(data) {
            let ID;
            // Generate ID
            if(contacts.details.length > 0) {
                ID= contacts.details[contacts.details.length - 1].id + 1;
            } else {
                ID= 0;
            }

            const contactAdd= new Contact(ID, data.firstName, data.lastName, data.phone);

            // Add to DS
            contacts.details.push(contactAdd);

            return contactAdd;
        },
        getContactById: function(id) {
            let found;
            contacts.details.find(function(contact) {
                if(id=== contact.id) {
                    found= contact
                }
            });
            return found;
        },
        setCurrentContact: function(contact) {
            contacts.currentData= contact;
        },
        getCurrentContact: function() {
            return contacts.currentData;
        },
        updateContact: function(firstName, lastName, phone) {
            let found= null;

            contacts.details.forEach(function(contact) {
                if(contact.id === contacts.currentData.id) {
                    contact.firstName= firstName;
                    contact.lastName= lastName;
                    contact.phone= phone;
                    found= contact;
                }
            });
            console.log(found, 123);
            return found;
        },
        deleteFromDS: function(id) {

            console.log(id);

            let found;

            found= contacts.details.map(function(contact) {

                return contact.id;

            });

            // get index
            const index= found.indexOf(id);

            // remove from DS
            contacts.details.splice(index, 1);

            console.log(found);

        },
        logData: function() {
            return contacts.details;
        },
        log: function() {
            return contacts;
        }
    }

})();

// UI Controller
const UICtrl= (function() {
    // Selectors
    const selectors= {
        headerContactAddForm: '#header-contact-add-form',
        nameFields: '#nameFields',
        plusBtn: '#add-contacts',
        searchContacts: '#search-contacts',
        myNumber: '#my-number',
        contactList: '#contacts',
        firstName: '#firstName',
        lastName: '#lastName',
        phoneNumber: '#phoneNumber',
        doneBtn: '#Done',
        cancelBtn: '#Cancel',
        searchBox: '#search-box',
        contactDetailsPerPerson: '#contact-details-per-person',
        contactClick: '.contact-click',
        backBtn: '#backBtn',
        editClick: '#edit-click',
        editContact: '#editContact',
        updateButton: '#updateButton',
        contactsUIInterface: '#contactsUIInterface',
        backToHome: '#backToHome',
        deleteContact: '#deleteContact'
    };

    // Public methods
    return {
        getInputs: function() {
            return {
                firstName:  document.querySelector(selectors.firstName).value,
                lastName :  document.querySelector(selectors.lastName).value,
                phone    :  document.querySelector(selectors.phoneNumber).value
            };
        },
        showContactsToUI: function(contactObject) {
            const allContactsFromDS= contactsDataCtrl.logData();
            const html= `
            <a href="#" class="contact-click ${contactObject.id} cont-${contactObject.id}">
                <div class="contact">
                    <b class='search-item'>${contactObject.firstName} ${contactObject.lastName}</b>
                </div>
                <hr class="line">
            </a>
            `;

            document.querySelector(selectors.contactList).insertAdjacentHTML('beforeend', html);
        },
        paintDatas: function() {
            let html= '';

            const datas= contactsDataCtrl.logData();

            // Loop through datas from data structure
            datas.forEach(function(data) {
                html +=`
                    <a href="#" class="contact-click ${data.id} cont-${data.id}">
                        <div class="contact">
                            <b class='search-item'>${data.firstName} ${data.lastName}</b>
                        </div>
                        <hr class="line">
                    </a>
                `;
            });

            // Insert contacts into DOM form DS
            document.querySelector(selectors.contactList).insertAdjacentHTML('beforeend', html);
        },
        clearInputFields: function() {
            document.querySelector(selectors.firstName).value   = '';
            document.querySelector(selectors.lastName).value    = '';
            document.querySelector(selectors.phoneNumber).value = '';
        },
        hideNewContactBlock: function() {
            document.querySelector(selectors.headerContactAddForm).style.display= 'none';
            document.querySelector(selectors.nameFields).style.display= 'none';
            document.querySelector(selectors.contactDetailsPerPerson).style.display= 'none';
        },
        hideEditContact: function() {
            document.querySelector(selectors.editContact).style.display= 'none';
        },
        displayNewContactBlock: function() {
            document.querySelector(selectors.headerContactAddForm).style.display= 'block';
            document.querySelector(selectors.nameFields).style.display= 'block';

            document.querySelector(selectors.plusBtn).style.display= 'none';
            document.querySelector(selectors.searchContacts).style.display= 'none';
            document.querySelector(selectors.myNumber).style.display= 'none';
            document.querySelector(selectors.contactList).style.display= 'none';

            // remove button
            document.querySelector('#deleteContacts').style.display= 'none';

            // added line
            document.querySelector(selectors.editContact).style.display= 'none';
        },
        updateState: function() {
            document.querySelector(selectors.editContact).style.display= 'block';
            // document.querySelector(selectors.nameFields).style.display= 'block';

            document.querySelector(selectors.plusBtn).style.display= 'none';
            document.querySelector(selectors.searchContacts).style.display= 'none';
            document.querySelector(selectors.myNumber).style.display= 'none';
            document.querySelector(selectors.contactList).style.display= 'none';

            // remove button
            document.querySelector('#deleteContacts').style.display= 'none';
        },
        hideContactShowHomeBlock: function() {
            document.querySelector(selectors.headerContactAddForm).style.display= 'none';
            document.querySelector(selectors.nameFields).style.display= 'none';

            // added line
            document.querySelector(selectors.editContact).style.display= 'none';

            document.querySelector(selectors.plusBtn).style.display= 'block';
            document.querySelector(selectors.searchContacts).style.display= 'block';
            document.querySelector(selectors.myNumber).style.display= 'block';


        },
        uiStateOnNameClick: function() {
            document.querySelector(selectors.plusBtn).style.display= 'none';
            document.querySelector(selectors.searchContacts).style.display= 'none';
            document.querySelector(selectors.myNumber).style.display= 'none';
            document.querySelector(selectors.contactList).style.display= 'none';

            // Show the particular detail UI
            document.querySelector(selectors.contactDetailsPerPerson).style.display= 'block';

            // added line
            document.querySelector(selectors.editContact).style.display= 'none';

            // remove button
            document.querySelector('#deleteContacts').style.display= 'none';
        },
        paintCurrentItem: function() {
            // add name to UI
            document.querySelector('#details-name').textContent= `${contactsDataCtrl.getCurrentContact().firstName} ${contactsDataCtrl.getCurrentContact().lastName}`;

            // set attribute to phone number in call button
            document.querySelector('#phone-wrap').setAttribute('href', `tel: ${contactsDataCtrl.getCurrentContact().phone}`);

            // add phone number
            document.querySelector('#det-phoneNumber').textContent= `Number: ${contactsDataCtrl.getCurrentContact().phone}`;

            // added line
            document.querySelector(selectors.editContact).style.display= 'none';

            // remove button
            document.querySelector('#deleteContacts').style.display= 'none';
        },
        addValuesToUI: function() {
            const inputsFromDS= contactsDataCtrl.log().currentData;

            document.querySelector('#fName').value= inputsFromDS.firstName;
            document.querySelector('#lName').value= inputsFromDS.lastName;
            document.querySelector('#phone').value= inputsFromDS.phone;

            // added line
            // document.querySelector(selectors.editContact).style.display= 'none';

            // console.log(inputsFromDS);

            // remove button
            document.querySelector('#deleteContacts').style.display= 'none';
        },
        showInputFields: function() {
            document.querySelector(selectors.nameFields).style.display   = 'block';

            // added line
            document.querySelector(selectors.editContact).style.display= 'none';

            // remove button
            document.querySelector('#deleteContacts').style.display= 'none';
        },
        deleteFromUI: function(id) {
            const classOfContact= `.cont-${id}`;
            document.querySelector(classOfContact).remove();
        },
        UISelectors: function() {
            return selectors;
        }
    }
})();

// App Controller
const AppCtrl= (function(contactsDataCtrl, UICtrl, StorageCtrl) {

    // Event listeners function
    function loadEvents() {
        const UISelectors= UICtrl.UISelectors();

        // Plus button click
        document.querySelector(UISelectors.plusBtn).addEventListener('click', UICtrl.displayNewContactBlock);
        
        // Add Contact event (doneBtn)
        document.querySelector(UISelectors.doneBtn).addEventListener('click', addContact);

        // Search Contacts event
        document.querySelector(UISelectors.searchBox).addEventListener('keyup', searchContact);

        // Cancel button click
        document.querySelector(UISelectors.cancelBtn).addEventListener('click', Cancel);

        // Contact click event
        document.querySelector(UISelectors.contactList).addEventListener('click', showContactDetails);

        // BackBtn
        document.querySelector(UISelectors.backBtn).addEventListener('click', backFunction);

        // Edit state
        document.querySelector(UISelectors.editClick).addEventListener('click', editState);

        // Edit functionality event
        document.querySelector(UISelectors.updateButton).addEventListener('click', updateFunction);

        // Delete functionality
        document.querySelector(UISelectors.deleteContact).addEventListener('click', deleteContactFunc);

        // Contacts UI Show on click
        /* In future: I may add back button for home state show */
    }

    // Add Contact event
    function addContact() {
        const UISelectors= UICtrl.UISelectors();

        // get inputs
        const inputs= UICtrl.getInputs();
        console.log(inputs);

        // Check if input fields are filled or not
        if(inputs.firstName !== '' && inputs.lastName !== '' && inputs.phone !== '') {
            // add inputs to data structure
            const addedContact= contactsDataCtrl.addToContactsDS(inputs);

            // add to localStorage
            StorageCtrl.storeContact(addedContact);
    
            // console.log(addedContact);
    
            // add to UI
            UICtrl.showContactsToUI(addedContact);
        }

        // Clear input fields
        UICtrl.clearInputFields();

        // Show Home state
        UICtrl.hideContactShowHomeBlock();

        // Show contact list after adding contact
        document.querySelector(UISelectors.contactList).style.display= 'block';
        // Reload after add
        location.reload();

    }

    // Search Contact
    function searchContact(e) {
        document.querySelectorAll('.contact-click').forEach(function(item) {

            if(item.firstElementChild.firstElementChild.textContent.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1) {
                item.style.display= 'block';
            } else {
                item.style.display= 'none';
            }

            // console.log(item.firstElementChild.firstElementChild);
        });
    }

    // Cancel
    function Cancel() {
        const UISelectors= UICtrl.UISelectors();

        // Clear input fields
        UICtrl.clearInputFields();

        // Show Home state
        UICtrl.hideContactShowHomeBlock();

        // Show contact list after adding contact
        document.querySelector(UISelectors.contactList).style.display= 'block';

        location.reload();
    }

    // show contact details UI
    function showContactDetails(e) {
        // console.log(e.target.classList);
        if(e.target.classList.contains('search-item')/*|| e.target.classList.contains('contact-click') || e.target.classList.contains('contact')*/) {
            UICtrl.uiStateOnNameClick();

            const id= parseInt(e.target.parentElement.parentElement.classList[1]);
            // console.log(id);
            // get contact by Id
            const contact= contactsDataCtrl.getContactById(id);
            // console.log(contact);
            // Set Current Item as this contact
            contactsDataCtrl.setCurrentContact(contact);

            // Paint the Current Data into UI
            UICtrl.paintCurrentItem();
        }

    }

    // back button function
    function backFunction() {
        const UISelectors= UICtrl.UISelectors();

        // Show Home state
        UICtrl.hideContactShowHomeBlock();

        // Show contact list after adding contact
        document.querySelector(UISelectors.contactList).style.display= 'block';

        // Hide detailsUI
        document.querySelector(UISelectors.contactDetailsPerPerson).style.display= 'none';

        location.reload();
    }

    // Edit state
    const editState= function() {
        const UISelectors= UICtrl.UISelectors();

        // Show input fields
        // UICtrl.showInputFields();

        // Hide detailsUI
        document.querySelector(UISelectors.contactDetailsPerPerson).style.display= 'none';

        // Show input fields
        // UICtrl.displayNewContactBlock();


        // Commented update state
        UICtrl.updateState();


        // Add Value to UI of input fields
        UICtrl.addValuesToUI();

        // Get values here to pass in update function to Update to DS
        const inputValues= UICtrl.getInputs();
    
        // Add inputs to the DS
        contactsDataCtrl.updateContact(inputValues.firstName, inputValues.lastName, inputValues.phone); 

    };

    // Update function
    const updateFunction= function() {
        const UISelectors= UICtrl.UISelectors();
        // Added events

        // Clear input fields
        UICtrl.clearInputFields();

        // Show Home state
        UICtrl.hideContactShowHomeBlock();

        // Show contact list after adding contact
        document.querySelector(UISelectors.contactList).style.display= 'block';

        // Get values here to pass in update function to Update to DS
        // const inputValues= UICtrl.getInputs();

        // Get 
        // const updatedValue= contactsDataCtrl.updateContact(inputValues.firstName, inputValues.lastName, inputValues.phone);

        // console.log(updatedValue);


        // Take data from Current State and change that value after taking inputs
        // const currentData= contactsDataCtrl.log().currentData;

        // Take inputs
        // const inputs= UICtrl.getInputs();
        // console.log(inputs);
        console.log(document.querySelector('#firstName').value);


        let firstName= document.querySelector('#fName').value;
        let lastName= document.querySelector('#lName').value;
        let phone= document.querySelector('#phone').value;
        console.log(firstName, lastName, phone);
        // change current Data value (Update value)
        const foundData= contactsDataCtrl.updateContact(firstName, lastName, phone);
        console.log(foundData);
        // Display Updated Value to UI
        const DSid= foundData.id;
        // console.log(foundData.firstName);

        console.log(foundData);

        document.querySelectorAll(UISelectors.contactClick).forEach(function(contact) {

            const id= parseInt(contact.classList[1]);
            console.log(id);
            // console.log(contact.className);
            if(DSid === id) {
                document.querySelector(`.cont-${DSid}`).innerHTML = `
                    <div class="contact">
                        <b class='search-item'>${foundData.firstName} ${foundData.lastName}</b>
                    </div>
                    <hr class="line">
                `;
            }

        });

        // Update from LS
        StorageCtrl.updateContactFromLS(foundData);
        
        // console.log(parseInt(Array.from(document.querySelectorAll(UISelectors.contactClick))[0].className.split(' ')[1]));

        // Show Home UI
        // Clear input fields
        // UICtrl.clearInputFields();

        // Show Home state
        UICtrl.hideContactShowHomeBlock();

        // Show contact list after adding contact
        document.querySelector(UISelectors.contactList).style.display= 'block';

        // console.log(currentData);
        // Show contacts

        location.reload();

    }

    // Delete Contact
    const deleteContactFunc= function() {
        const UISelectors= UICtrl.UISelectors();

        // Remove from DS

        // get current item
        const currentCont= contactsDataCtrl.log().currentData;

        // delete from DS, by passing id
        contactsDataCtrl.deleteFromDS(currentCont.id);

        // Delete from UI
        UICtrl.deleteFromUI(currentCont.id);

        // Delete From ls
        StorageCtrl.deleteContactFromLS(currentCont.id);

        // Clear input fields
        UICtrl.clearInputFields();

        // Show Home state
        UICtrl.hideContactShowHomeBlock();

        // Show contact list after adding contact
        document.querySelector(UISelectors.contactList).style.display= 'block';

        document.querySelector('#contact-details-per-person').style.display= 'none';

        location.reload();

    };

    // Public methods
    return {
        initApp: function() {
            // Hide addContacts block
            UICtrl.hideNewContactBlock();
            
            // get contact list array from DS, to validate 
            // for showing contacts in UI, if it's array length is > 0 
            const cont= contactsDataCtrl.log().details;

            // hide remove all button at first
            document.querySelector('#deleteContacts').style.display= 'none';

            if(cont.length > 0) {
                // Paint the contacts present in the Data Structure in Screen
                UICtrl.paintDatas();

                // Show 
                document.querySelector('#deleteContacts').style.display= 'block';

                document.querySelector('#deleteContacts').addEventListener('click', function() {
                    StorageCtrl.deleteEverythingFromLS();
                    location.reload();
                });
            } else {
                document.querySelector(UICtrl.UISelectors().contactList).style.display= 'none';
            }

            // Hide Edit Contact
            UICtrl.hideEditContact();
            
            // Load all events
            loadEvents();
        }
    }

})(contactsDataCtrl, UICtrl, StorageCtrl);

AppCtrl.initApp();