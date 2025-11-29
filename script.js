// -----------------------------------------------------
// 1. DATA MODELS (CLASSES)
// -----------------------------------------------------

class Pet {
    constructor(name, age, gender, breed, service, type, paymentMethod, retainerFrequency) {
        this.Name = name;
        this.Age = parseInt(age);
        this.Gender = gender;
        this.Breed = breed;
        this.Service = service;
        this.Type = type;
        this.PaymentMethod = paymentMethod;
        this.Retainer = retainerFrequency;
    }
}

class Service {
    constructor(name, price, description = "") {
        this.id = Date.now() + Math.random();
        this.name = name;
        this.price = parseFloat(price);
        this.description = description;
    }
}

// Helper to get initial data if Local Storage is empty
function getInitialClients() {
    return [
        new Pet("Kobie", 3, "Male", "Cane Corso", "Full Grooming", "Dog", "Card", "Weekly"),
        new Pet("Cooper", 7, "Female", "German Shepherd", "Nail Trim & Filing", "Dog", "Cash", "None"),
        new Pet("Barkley", 5, "Male", "Doberman", "Dental Cleaning", "Dog", "Venmo", "Monthly"),
        new Pet("Shep", 4, "Male", "Belgian Malinois", "De-shedding Treatment", "Dog", "Card", "None"),
        new Pet("Boss", 6, "Male", "Thai Ridgeback", "Deep Conditioning Wash", "Dog", "Cash", "Bi-Weekly")
    ];
}

// Helper to get initial services if Local Storage is empty
function getInitialServices() {
    return [
        new Service("Full Grooming", 65, "Includes wash, trim, nail clipping, and ear cleaning."),
        new Service("Nail Trim & Filing", 20, "Precision nail service with filing for smooth edges."),
        new Service("Dental Cleaning", 40, "Non-anesthetic dental brushing and breath treatment."),
        new Service("De-shedding Treatment", 30, "Special wash and brushing to reduce shedding."),
        new Service("Deep Conditioning Wash", 25, "Restorative wash with premium coat conditioner.")
    ];
}

// -----------------------------------------------------
// 2. SALON APPLICATION OBJECT
// -----------------------------------------------------

const salon = {
    clients: JSON.parse(localStorage.getItem('salonClients')) || getInitialClients(),
    services: JSON.parse(localStorage.getItem('salonServices')) || getInitialServices(),

    // CRUD: Pet Clients
    registerNewPet: function(pet) {
        this.clients.push(pet);
        this.saveClients();
        this.updateAllDisplays(); // Consolidated update function
        alert(`${pet.Name} has been successfully registered!`);
    },
    
    // Deletes pet by its index in the clients array
    deletePet: function(index) {
        const petName = this.clients[index].Name;
        this.clients.splice(index, 1);
        this.saveClients();
        this.updateAllDisplays(); // Consolidated update function
        alert(`${petName} has been successfully deleted.`);
    },

    // Local Storage
    saveClients: function() {
        localStorage.setItem('salonClients', JSON.stringify(this.clients));
    },

    // Data Calculations
    calculateAverageAge: function() {
        if (this.clients.length === 0) {
            return 0;
        }
        const totalAge = this.clients.reduce((sum, client) => sum + client.Age, 0);
        return (totalAge / this.clients.length).toFixed(1);
    },

    calculatePetTypeCount: function(type) {
        return this.clients.filter(client => client.Type.toLowerCase() === type.toLowerCase()).length;
    },

    // -------------------
    // UI RENDERING - Dashboard Stats (index.html)
    // -------------------
    displaySalonData: function() {
        // Only run if the elements exist (i.e., we are on index.html)
        if (document.getElementById('petCount')) {
            document.getElementById('petCount').textContent = this.clients.length;
            document.getElementById('averageAge').textContent = this.calculateAverageAge() + " years";
            document.getElementById('dogCount').textContent = this.calculatePetTypeCount("Dog");
        }
    },

    // -------------------
    // UI RENDERING - Recent Clients (index.html)
    // -------------------
    displayRecentPets: function() {
        const tableBody = document.querySelector('#recentPetsTableBody');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        // Get the last 5 clients (most recent)
        const recentClients = this.clients.slice(-5).reverse();

        recentClients.forEach((pet, index) => {
            const row = tableBody.insertRow();
            
            row.insertCell().textContent = this.clients.length - (this.clients.indexOf(pet)); // Calculate dynamic #
            row.insertCell().textContent = pet.Name;
            row.insertCell().textContent = pet.Service;
            
            // Retainer cell - use a badge/tag for visibility
            const retainerCell = row.insertCell();
            const retainerBadge = document.createElement('span');
            retainerBadge.textContent = pet.Retainer;
            
            // Apply different badge classes based on frequency
            if (pet.Retainer === 'Weekly') {
                retainerBadge.classList.add('badge', 'bg-success');
            } else if (pet.Retainer === 'Monthly' || pet.Retainer === 'Bi-Weekly') {
                retainerBadge.classList.add('badge', 'bg-info', 'text-dark');
            } else {
                retainerBadge.classList.add('badge', 'bg-secondary');
            }
            retainerCell.appendChild(retainerBadge);
            
            // Action button (e.g., direct link to edit/view details)
            const actionsCell = row.insertCell();
            actionsCell.classList.add('text-center');

            const viewButton = document.createElement('a');
            viewButton.textContent = 'View/Edit';
            viewButton.href = 'registration.html'; // Direct to registration page
            viewButton.classList.add('btn', 'btn-sm', 'btn-primary');
            actionsCell.appendChild(viewButton);
        });
    },

    // -------------------
    // UI RENDERING - Full Client Table (registration.html)
    // -------------------
    displayRow: function() {
        const tableBody = document.querySelector('#petsTable tbody');
        if (!tableBody) return;
        
        tableBody.innerHTML = ''; 

        this.clients.forEach((pet, index) => {
            const row = tableBody.insertRow();
            
            row.insertCell().textContent = index + 1;
            row.insertCell().textContent = pet.Name;
            row.insertCell().textContent = pet.Age;
            row.insertCell().textContent = pet.Gender;
            row.insertCell().textContent = pet.Breed;
            row.insertCell().textContent = pet.Service;
            row.insertCell().textContent = pet.Type;
            row.insertCell().textContent = pet.PaymentMethod;
            row.insertCell().textContent = pet.Retainer;
            
            const actionsCell = row.insertCell();
            actionsCell.classList.add('text-center');
            
            // Edit button function (implementation not shown for brevity, often links to a new page or opens a modal)
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('btn', 'btn-sm', 'btn-warning', 'me-2');
            editButton.addEventListener('click', () => {
                // To implement full edit functionality, you would pass the index to the form fields
                alert(`Editing client #${index + 1}: ${pet.Name}`);
            });
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-sm', 'btn-danger');
            deleteButton.addEventListener('click', () => {
                if(confirm(`Are you sure you want to delete ${pet.Name}?`)) {
                    this.deletePet(index);
                }
            });

            actionsCell.appendChild(editButton);
            actionsCell.appendChild(deleteButton);
        });
    },

    // Consolidated function to update all relevant UI parts
    updateAllDisplays: function() {
        this.displaySalonData();
        this.displayRecentPets();
        this.displayRow();
    }
};

// -----------------------------------------------------
// 3. EVENT HANDLERS
// -----------------------------------------------------

function handleFormSubmission(e) {
    e.preventDefault();

    const name = document.getElementById('txtName').value.trim();
    const age = document.getElementById('txtAge').value.trim();
    const gender = document.getElementById('txtGender').value;
    const breed = document.getElementById('txtBreed').value.trim();
    const service = document.getElementById('selService').value;
    const type = document.getElementById('txtType').value.trim();
    const paymentMethod = document.getElementById('selPayment').value;
    const retainerFrequency = document.getElementById('selRetainer').value;

    const parsedAge = parseInt(age);
    
    if (isNaN(parsedAge) || parsedAge <= 0 || name === "" || breed === "" || !gender || !service || !paymentMethod || !retainerFrequency) {
        alert("Please ensure all fields are entered correctly and age is a valid number.");
        return;
    }

    const newClient = new Pet(name, parsedAge, gender, breed, service, type, paymentMethod, retainerFrequency);
    salon.registerNewPet(newClient);
    
    e.target.reset();
}

// -----------------------------------------------------
// 4. INITIALIZATION (DOM LOADED)
// -----------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    // 1. Update all statistics and tables
    salon.updateAllDisplays();
    
    // 2. Attach Form Listener (Only on registration.html)
    const registrationForm = document.getElementById('petRegistrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleFormSubmission);
        
        // Populate Service dropdown 
        const serviceSelect = document.getElementById('selService');
        if(serviceSelect) {
            serviceSelect.innerHTML = '<option value="" disabled selected>Select a Service</option>';
            salon.services.forEach(service => {
                const option = document.createElement('option');
                option.value = service.name;
                option.textContent = service.name;
                serviceSelect.appendChild(option);
            });
        }
    }
    
    // 3. Console Delete Button listener (Deletes the last registered pet)
    const consoleDeleteBtn = document.getElementById('consoleDeleteBtn');
    if (consoleDeleteBtn) {
        consoleDeleteBtn.addEventListener('click', function() {
            if (salon.clients.length > 0) {
                const lastIndex = salon.clients.length - 1;
                const petName = salon.clients[lastIndex].Name;
                if(confirm(`Are you sure you want to delete the last registered pet, ${petName}?`)) {
                    salon.deletePet(lastIndex);
                }
            } else {
                alert("The client list is empty. Nothing to delete.");
            }
        });
    }

    // 4. Dark Mode Toggle Logic (on index.html and services.html)
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
        });

        // Load saved preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
        }
    }
});