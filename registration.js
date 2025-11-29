// This file is maintained for auxiliary object creation and array manipulation exercises.
// The main application data (salon.clients) is now managed by script.js and Local Storage.

// 1. Example Pet Object Literals (matching the default structure)
let pet1 = {
   name: "Kobie",
   age: 3,
   gender: "Male",
   service: "Full Grooming",
   breed: "Cane Corso",
   paymentMethod: "Card",
   retainerFrequency: "Weekly"
};

let pet2 = {
   name: "Cooper",
   age: 7,
   gender: "Female",
   service: "Nail Trim & Filing",
   breed: "German Shepherd",
   paymentMethod: "Cash",
   retainerFrequency: "None"
};

let pet3 = {
   name: "Barkley",
   age: 5,
   gender: "Male",
   service: "Dental Cleaning",
   breed: "Doberman",
   paymentMethod: "Venmo",
   retainerFrequency: "Monthly"
};

// 2. Create a list of pets (array)
let petsList = [pet1, pet2, pet3];
console.log("Example Pet List for registration.js:", petsList);

// 3. Display the pets count
console.log("Total Example Pets (registration.js):", petsList.length);

// You can continue to use this file for any other non-essential data manipulation logic.