# Contact book

Contact book with a breakdown of contacts into categories and the ability to add new contacts using a form.
https://zemsoft-contacts.netlify.app

# Contact list
This is the main page of the application, which shows all saved contacts. Above the list is a selector with a filter. The filter contains three parameters – “All” / “Relatives” / “Colleagues”. All contacts, sorted by date added.

# Contact
The contact card contains the Name, Email, Phone, Dropdown, the date the contact was created and the “Delete” button. By clicking on the line of any contact, a contact card opens. The contact can be edited.

# Fake Api
After successful form validation, the data from the form is sent to the fake API (using setTimeout to simulate sending data). While the data is being “sent”, a loading indicator (loader) is displayed.
