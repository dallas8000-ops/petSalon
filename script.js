class Pet {
    // UPDATED: Constructor now accepts 'paymentMethod' and 'retainer'
    constructor(name, age, gender, breed, service, type, paymentMethod, retainer) { 
        this.Name = name;
        this.Age = parseInt(age);
        this.Gender = gender;
        this.Breed = breed;
        this.Service = service;
        this.Type = type;
        this.PaymentMethod = paymentMethod;
        this.Retainer = retainer; // NEW PROPERTY
    }
}

const salon = {
    // UPDATED: Initial clients now include 'PaymentMethod' and 'Retainer'
    clients: [
        new Pet("Kobie", 3, "Male", "Cane Corso", "Full Grooming", "Dog", "Card", "Monthly"),
        new Pet("Cooper", 7, "Female", "German Shepherd", "Nail Trim & Filing", "Dog", "Cash", "Bi-Weekly"),
        new Pet("Barkley", 5, "Male", "Doberman", "Dental Cleaning", "Dog", "Venmo", "None"),
        new Pet("Shep", 4, "Male", "Belgian Malinois", "De-shedding Treatment", "Dog", "Card", "Weekly"),
        new Pet("Boss", 6, "Male", "Thai Ridgeback", "Deep Conditioning Wash", "Dog", "Cash", "None")
    ],

    calculateAverageAge: function() {
        if (this.clients.length === 0) {
            return 0;
        }

        const totalAge = this.clients.reduce((sum, client) => sum + client.Age, 0);
        return (totalAge / this.clients.length).toFixed(1);
    },

    displaySalonData: function() {
        const petCountElement = document.getElementById('petCount');
        if (petCountElement) {
            petCountElement.textContent = this.clients.length;
        }

        const averageAgeElement = document.getElementById('averageAge');
        if (averageAgeElement) {
            averageAgeElement.textContent = `${this.calculateAverageAge()} years`;
        }
    },

    registerNewPet: function(newClient) {
        this.clients.push(newClient);
        console.log("Registered a new client:", newClient);
        this.displayRow();
        this.displaySalonData();
    },

    // NEW FUNCTION: Handles pet deletion and re-renders the table
    deletePet: function(index) {
        if (index >= 0 && index < this.clients.length) {
            console.log(`Deleting pet: ${this.clients[index].Name} at index ${index}`);
            // Remove 1 element starting from the given index
            this.clients.splice(index, 1);
            // Re-render the table and update dashboard data
            this.displayRow();
            this.displaySalonData();
        } else {
            console.error("Invalid index for deletion:", index);
        }
    },

    displayRow: function() {
        const tableBody = document.querySelector('#petsTable tbody');
        if (!tableBody) return;

        let html = "";
        // Loop through the clients array
        for (let i = 0; i < this.clients.length; i++) {
            const pet = this.clients[i];
            // Format retainer for display
            const retainerDisplay = pet.Retainer === 'None' ? '—' : `${pet.Retainer} Retainer`;
            
            html += `
                <tr class="align-middle">
                    <td class="text-center">${i + 1}</td>
                    <td>${pet.Name}</td>
                    <td>${pet.Age}</td>
                    <td>${pet.Gender}</td>
                    <td>${pet.Breed}</td>
                    <td>${pet.Service}</td>
                    <td class="text-uppercase fw-bold">${pet.PaymentMethod}</td> 
                    <td class="text-center">${retainerDisplay}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-danger shadow-sm" onclick="salon.deletePet(${i})">
                            <i class="fas fa-trash-alt me-1"></i> Delete
                        </button>
                    </td>
                </tr>
            `;
        }
        tableBody.innerHTML = html;
    }
};

function handleFormSubmission(e) {
    e.preventDefault();

    const name = document.getElementById('petName').value.trim();
    const age = document.getElementById('petAge').value.trim();
    const breed = document.getElementById('petBreed').value.trim();
    const gender = document.getElementById('petGender').value;
    const service = document.getElementById('petService').value;
    const paymentMethod = document.getElementById('petPayment').value;
    const retainer = document.getElementById('petRetainer').value; // READS NEW FIELD
    const type = document.getElementById('petType').value;

    const validationMessageElement = document.getElementById('validationMessage');

    // --- Validation ---
    const parsedAge = parseInt(age);
    // UPDATED VALIDATION: Checks required fields (retainer defaults to 'None' so it's not strictly checked)
    if (isNaN(parsedAge) || parsedAge <= 0 || name === "" || breed === "" || !gender || !service || !paymentMethod) {
        // Use a custom message box instead of alert()
        validationMessageElement.textContent = "Please ensure all fields (except Repeat Service), are entered correctly and age is a valid number.";
        validationMessageElement.classList.remove('d-none');
        return;
    }
    // Clear the message on success
    validationMessageElement.classList.add('d-none');
    // --------------------

    // UPDATED INSTANTIATION: Passes the new attribute to the Pet constructor
    const newClient = new Pet(name, parsedAge, gender, breed, service, type, paymentMethod, retainer);

    salon.registerNewPet(newClient);

    // Reset the form after successful submission
    e.target.reset();
}

document.addEventListener("DOMContentLoaded", function() {
    // If on index.html, display dashboard data
    const petCountElement = document.getElementById('petCount');
    if (petCountElement) {
        salon.displaySalonData();
    }
    
    // If on registration.html: attach form listener AND display the table
    const registrationForm = document.getElementById('petRegistrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleFormSubmission);
    }
    
    const tableBody = document.querySelector('#petsTable tbody');
    if (tableBody) {
        salon.displayRow();
    }
});