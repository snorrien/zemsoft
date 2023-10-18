# Contact book 
The interface for the web application is a simple contact book with a breakdown of contacts into categories and the ability to add new contacts using a form.

# Filtration
By “All”: all contacts are listed, sorted by date added.
“Relatives”: only contacts from the “Relatives” category are listed, sorted by date added.
“Colleagues”: only contacts from the “Colleagues” category are listed, sorted by date added.

# Contact
When you click on the “Add” button, the form for adding a contact opens. The contact card contains the Name, Email, Phone number of the contact, Dropdown with list of categories – “Colleagues” and “Relatives”, the date the contact was created and the “Delete” button. All inputs have validation.
Clicking on the line of any contact opens a contact card with the ability to edit.

# Fake API
After successful form validation, the data is sent to the fake API (using setTimeout to simulate sending data).
While the data is being “sent”, a loading indicator (loader) is displayed.
Once the sending is complete, the contact with the creation date is displayed in the list.
